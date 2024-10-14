import AppRouter from "./router/AppRouter";
import './app.css'
import { useEffect } from "react";
import AuthProvider from "./auth/AuthProvider";

export default function App() {
  
  useEffect(() => {
    
  }, [])

  return (
    <AuthProvider >
      <AppRouter />
    </AuthProvider>
  )
}
