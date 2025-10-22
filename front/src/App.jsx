import './App.css';
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Home from "./views/Home/Home";
import MyAppointments from './views/MyAppointments/MyAppointments';
import Login from './views/Login/Login';
import Register from './views/Register/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para establecer el estado de autenticación
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/appointments" element={<MyAppointments />} />
      </Routes>
    </div>
  );
}

export default App;
