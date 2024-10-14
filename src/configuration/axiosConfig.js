import axios from "axios";

// Crea la instancia de Axios con la URL base
export const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Asegúrate de que la URL base esté configurada correctamente en tu archivo .env
});

// Interceptor para agregar el token en las solicitudes
axiosConfig.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // O sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Añade el token a las cabeceras
  }
  return config;
}, error => {
  // Manejo de errores en la solicitud
  return Promise.reject(error);
});

// Interceptor para manejar errores de respuesta (como 401 o 403)
axiosConfig.interceptors.response.use(
  response => {
    return response; // Devuelve la respuesta si es exitosa
  },
  error => {
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // Elimina el token o cualquier dato del usuario de localStorage/sessionStorage
      localStorage.clear(); // O eliminar solo el token, si es necesario
      sessionStorage.clear();

      // Redirige al usuario a la página de login
      window.location.pathname = "/login";
    }
    return Promise.reject(error);
  }
);