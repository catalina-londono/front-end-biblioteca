import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './privates/PrivateRoute'
import BiblioRoutes from './privates/BiblioRoutes'
import PublicRoute from './publics/PublicRoute'
import Public from './publics/Publics'

export default function AppRouter() {
  return (
      <Routes>
        
        <Route 
          path="/pr/*" 
          element={
            <PrivateRoute>
              <BiblioRoutes />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/*"
          element={
            <PublicRoute>
              <Public />
            </PublicRoute>
          }
        />
      </Routes>
  )
}
