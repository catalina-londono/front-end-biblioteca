import { useEffect, useState } from "react";
import "./Home.css";
import { consultarPrestamos, guardarPrestamo } from '../../services/private/PrestamoService';
import { consultarUsuarios } from "../../services/private/UsuarioService";
import { consultarEjemplares } from "../../services/private/EjemplarService";
import Swal from "sweetalert2";

const src = "/logo.png";

const init = () => {
  if (sessionStorage.getItem("user")) {
    return JSON.parse(sessionStorage.getItem("user")) || { logged: false };
  }
  return false;
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [gestorBD, setGestorBD] = useState({
    nombre: "",
  });
  const [prestamos, setPrestamos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [ejemplares, setEjemplares] = useState([]);
  const [prestamo, setPrestamo] = useState({
    ejemplar: '',
    usuario: ''
  });

  useEffect(() => {
    const user = init();
    if (user && user.user && user.user.gestorBD) {
      setGestorBD(user.user.gestorBD);
    }

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoading(false);
    };
    listarPrestamos();
    setTimeout(() => {
      listarPrestamos();
    }, 500);
  }, []);

  useEffect(() => {
    listarEjemplares();
  }, []);

  useEffect(() => {
    listarUsuarios();
  }, []);

  const listarUsuarios = async () => {
    try {
      const { data } = await consultarUsuarios();
      setUsuarios(data.filter(usuario => usuario.enabled)); // Filtrar usuarios habilitados
    } catch (e) {
      console.log(e);
    }
  };

  const listarEjemplares = async () => {
    try {
      const { data } = await consultarEjemplares();
      setEjemplares(data.filter(ejemplar => !ejemplar.prestado)); // Filtrar ejemplares no prestados
    } catch (e) {
      console.log(e);
    }
  };

  const listarPrestamos = async () => {
    try {
      const { data } = await consultarPrestamos();
      setPrestamos(data);
    } catch (e) {
      console.log(e);
    }
  };

  const hacerPrestamo = async () => {
    try {
      const { data } = await guardarPrestamo(prestamo);
      console.log("Respuesta de la API:", data);

      Swal.fire({
        title: 'Préstamo',
        text: 'Préstamo realizado',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      listarPrestamos(); // Actualiza la lista de préstamos después de hacer uno nuevo
    } catch (e) {
      let msj = 'No se pudo realizar el préstamo';
      if (e.response && e.response.data && e.response.data.msj) {
        msj = e.response.data.msj;
      }

      Swal.fire({
        title: 'Préstamo',
        text: msj,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.log("Error al realizar el préstamo:", e);
    }
  };

  const handle = (e) => {
    e.preventDefault();
    setPrestamo({
      ...prestamo,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container">
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Nuevo Préstamo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Ejemplar:
                  </label>
                  <select
                    onChange={handle}
                    className="form-select"
                    id="inputGroupSelect01"
                    name="ejemplar"
                  >
                    <option value="">Seleccionar Ejemplar</option>
                    {ejemplares.map((ejemplar, index) => (
                      <option key={index} value={ejemplar._id}>
                        {ejemplar.codigo} - {ejemplar.libro.titulo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Usuario:
                  </label>
                  <select
                    onChange={handle}
                    className="form-select"
                    id="inputGroupSelect01"
                    name="usuario"
                  >
                    <option value="">Seleccionar Usuario</option>
                    {usuarios.map((usuario, index) => (
                      <option key={index} value={usuario._id}>
                        {usuario.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                onClick={hacerPrestamo}
                type="button"
                className="btn btn-primary"
                disabled={prestamo.ejemplar.length === 0 || prestamo.usuario.length === 0}
              >
                Confirmar Préstamo
              </button>
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-center mt-3">Prestamos IU Digital</h3>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <img
          src={src}
          className={`radius img img-fluid ${loading ? "loading" : "loaded"}`}
          alt="Logo"
        />
      )}
      <p className="text-center mt-3">
        <b>Gestor:</b> {gestorBD.nombre}
      </p>
      <h4>Listado de préstamos</h4>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo"
      >
        Nuevo Préstamo <i className="fa-solid fa-plus"></i>
      </button>

      <div className="input-group mb-3 my-2">
        <input type="text" className="form-control" placeholder="Buscar" aria-label="Buscar" />
        <button className="btn btn-outline-secondary" type="button">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Ejemplar</th>
            <th scope="col">Usuario</th>
            <th scope="col">Gestor</th>
            <th scope="col">Fecha</th>
            <th scope="col">Entrega</th>
            <th scope="col">Estado</th>
            <th scope="col">Detalle</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map((prestamo, index) => (
            <tr key={prestamo._id}>
              <th scope="row">{index + 1}</th>
              <td>{prestamo.ejemplar.codigo}</td>
              <td>{prestamo.usuario.nombre}</td>
              <td>{prestamo.gestor.nombre}</td>
              <td>{prestamo.fechaPrestamo}</td>
              <td>{prestamo.fechaADevolver}</td>
              <td className={prestamo.fechaDevolución ? 'green' : 'red'}>
                {prestamo.fechaDevolución ? 'Disponible' : 'Prestado'}
              </td>
              <td>
                <i className="fa-solid fa-eye"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
