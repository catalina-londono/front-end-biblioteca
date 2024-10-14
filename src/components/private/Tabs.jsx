import { NavLink } from "react-router-dom";
import './Tabs.css'

export default function Tabs() {
    return (
        <nav id="tab-main" className="navbar fixed-bottom">
            <div className="container-fluid justify-content-center">
                <ul className="nav nav-pills text-center">
                    <NavLink
                        className="nav-link"
                        aria-current="page"
                        aria-label="Préstamos"
                        to="/home"
                    >
                        <i className="fa-solid fa-house fa-xl"></i>
                    </NavLink>
                    <NavLink
                        className="nav-link"
                        aria-label="Gestión usuarios"
                        to="/pr/usuarios"
                    >
                        <i className="fa-solid fa-users fa-xl"></i>
                    </NavLink>
                    <NavLink
                        className="nav-link"
                        aria-label="Gestión libros"
                        to="/pr/libros"
                    >
                        <i className="fa-solid fa-book fa-xl"></i>
                    </NavLink>
                    <NavLink
                        className="nav-link"
                        aria-label=" Gestión Autores"
                        to="/pr/autores"
                    >
                        <i className="fa-solid fa-user-pen fa-xl"></i>
                    </NavLink>
                    <NavLink
                        className="nav-link"
                        aria-label="Gestión Editoriales"
                        to="/pr/editoriales"
                    >
                        <i className="fa-solid fa-newspaper fa-xl"></i>
                    </NavLink>
                </ul>
            </div>
        </nav>
    )
}
