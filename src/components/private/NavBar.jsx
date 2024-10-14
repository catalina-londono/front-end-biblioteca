import Swal from 'sweetalert2';
import { logout } from '../../services/public/AuthService';
import './NavBar.css'

export default function NavBar({ puntos = 0, envases = 0 }) {

    const salir = () => {
        Swal.fire({
            title: "Salir del Sistema",
            text: "¿Seguro deseas cerrar sesión?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#024E50",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Salir"
        }).then((r) => {
            if (r.isConfirmed) {
                logout()
                window.location.reload();
            }
        })

    }

    return (
        <nav id="nav-main" className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <div id="titulo">
                   Biblioteca IUD
                </div>
                <button id="btn-toggle" onClick={salir} className="btn" >
                    <i className="fa-solid fa-right-from-bracket"></i>
                </button>
            </div>
        </nav>

    )
}
