import { axiosConfig } from "../../configuration/axiosConfig";

const headers = {
    "Content-Type": "application/json",
};

export const guardarPrestamo = async (prestamo) => {
  const token = sessionStorage.getItem('token')
      headers.token = token
      const data = {
        ejemplar: {
        _id : prestamo.ejemplar
        },
        usuario: {
        _id : prestamo.usuario
        }
      }
      return await axiosConfig.post('/prestamos',
                  data,
                  {
                      headers: headers
                  }
              )
};

export const consultarPrestamos = async () => {
  const token = sessionStorage.getItem("token");
  headers.token = token;
  return await axiosConfig.get("/prestamos", {
    headers: headers,
  });
};
