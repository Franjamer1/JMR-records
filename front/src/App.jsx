import './App.css';
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Home from "./views/Home/Home";
import MyAppointments from './views/MyAppointments/MyAppointments';
import Login from './views/Login/Login';
import Register from './views/Register/Register';

// Admin Views
import AdminLayout from './views/Admin/AdminLayout';
import AdminHome from './views/Admin/AdminHome';
import AdminTurnos from './views/Admin/AdminTurnos';
import AdminUsuarios from './views/Admin/AdminUsuarios';
import UserAppointments from './views/Admin/UserAppointments';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(""); // "user" o "admin"
  const navigate = useNavigate();

  // Función para establecer el estado de autenticación
  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);

    // Redirigir según rol
    if (role === "admin") navigate("/admin/home");
    else navigate("/home");
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    localStorage.removeItem("token"); // Limpiar token
    navigate("/");
  };

  // Verificar si hay token guardado al iniciar la app
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      setIsLoggedIn(true);
      setUserRole(user.role);
    }
  }, []);

  return (
    <div>
      {/* <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} /> */}
      <NavBar
        isLoggedIn={isLoggedIn}
        userRole={userRole}       // 👈 Agregá esto
        onLogout={handleLogout}
      />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* User routes */}
        {isLoggedIn && userRole === "user" && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/appointments" element={<MyAppointments />} />
          </>
        )}

        {/* Admin routes */}
        {isLoggedIn && userRole === "admin" && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="home" element={<AdminHome />} />
            <Route path="turnos" element={<AdminTurnos />} />
            <Route path="usuarios" element={<AdminUsuarios />} />
            <Route path="usuarios/:id" element={<UserAppointments />} />
          </Route>
        )}

        {/* Fallback: si alguien intenta entrar sin login */}
        <Route path="*" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </div>
  );
}

export default App;

