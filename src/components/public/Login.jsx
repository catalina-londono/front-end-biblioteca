import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../auth/AuthContext';
import { login } from '../../services/public/AuthService';
import { types } from '../../types/types';
import Swal from 'sweetalert2';
import './Login.css';

export default function Login() {
  const { dispatch } = useContext(AuthContext);
  const [usr, setUsr] = useState({ documento: '', password: '', captcha: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleValidation = () => {
    if (!usr.documento || !usr.password) {
      Swal.fire('Error', 'Documento y contraseña son requeridos', 'error');
      return false;
    }
    if (!validateCaptcha(usr.captcha)) {
      Swal.fire('Error', 'Captcha invalido', 'error');
      loadCaptchaEnginge(6);
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      setLoading(true);
      try {
        const res = await login(usr);
        dispatch({
          type: types.login,
          payload: { user: res.data }
        });
        Swal.fire('Bienvenido', 'Inicio de sesión exitoso', 'success');
        window.location.href = '/home';
      } catch (e) {
        Swal.fire('Error', e.response?.data?.msg || 'Credenciales inválidas', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
        <img src="/logo.png" className="img-fluid img-thumbnail" alt="Logo" style={{ width: '300px' }} />
          <div className="col-md-8 col-lg-6 col-xl-5">
            <form onSubmit={handleLogin}>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="documento"
                  name="documento"
                  className="form-control form-control-lg"
                  value={usr.documento}
                  onChange={(e) => setUsr({ ...usr, documento: e.target.value })}
                  placeholder="Ingrese su documento"
                />
                <label className="form-label" htmlFor="documento">Documento</label>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control form-control-lg"
                  value={usr.password}
                  onChange={(e) => setUsr({ ...usr, password: e.target.value })}
                  placeholder="Ingrese su contraseña"
                />
                <label className="form-label" htmlFor="password">Contraseña</label>
              </div>

              <div className="form-outline mb-4">
                <LoadCanvasTemplateNoReload />
                <input
                  type="text"
                  id="captcha"
                  name="captcha"
                  className="form-control form-control-lg"
                  value={usr.captcha}
                  onChange={(e) => setUsr({ ...usr, captcha: e.target.value })}
                  placeholder="Ingrese el captcha"
                />
                <label className="form-label" htmlFor="captcha">Captcha</label>
              </div>

              <button type="submit" className="btn btn-primary btn-lg btn-block">Iniciar Sesión</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
