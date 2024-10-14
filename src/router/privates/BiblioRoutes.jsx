import NavBar from '../../components/private/NavBar'
import { Route, Routes } from 'react-router-dom'
import Tabs from '../../components/private/Tabs'
import Home from '../../components/private/Home'
import NoFound from '../../components/public/NoFound'
import { useEffect, useState } from 'react'
import Usuario from '../../components/private/usuarios/Usuario'
import Libro from '../../components/private/libros/Libro'

const init = () => {
  return JSON.parse(sessionStorage.getItem('user'))
}

export default function BiblioRoutes() {
  const [user, setUser] = useState({
    nombre: ''
})

useEffect(() => {
    const usuario = init()
    if (usuario && usuario.logged) {
        setUser(usuario.user.gestorDB)
    }
}, [])

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/*" element={<NoFound />} />
        <Route path="/usuarios*" element={<Usuario />} />
        <Route path="/libros*" element={<Libro />} />
      </Routes>
      <Tabs />
    </>
  )
}
