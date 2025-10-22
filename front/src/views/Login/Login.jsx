import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'; // Importa Link desde react-router-dom
import styles from "./Login.module.css";
import okSound from "../../assets/sounds/okSound.mp3"
import failSound from "../../assets/sounds/failSound.mp3"
import { useDispatch, /*useSelector*/ } from "react-redux";
import { addUser } from "../../redux/reducer";

const Login = ({ onLogin }) => {

    // const userLogger = useSelector((state) => state.userActive)

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const initialState = {
        username: "",
        password: "",
    };

    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState(initialState);

    const playokSound = () => {
        const audio = new Audio(okSound);
        audio.play();
    };

    const playfailSound = () => {
        const audioFail = new Audio(failSound)
        audioFail.play()
    }

    const validate = (form) => {
        const errors = {};
        if (!form.username) errors.username = "El nombre de usuario es obligatorio.";
        if (!form.password) errors.password = "La contraseña es obligatoria.";
        return errors;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const postData = async () => {
        try {
            const response = await axios.post("http://localhost:3000/users/login", form);

            if (response.status === 200) {
                dispatch(addUser(response.data.user))
                toast.success("Login exitoso");
                playokSound();
                onLogin(); // Actualiza el estado de autenticación en el componente padre (App.jsx)
                setTimeout(() => {
                    navigate('/home'); // Redirige al usuario al Login después de mostrar el toast
                }, 1500);
            } else {
                toast.error("Usuario o contraseña incorrectos");
                playfailSound();
            }
        } catch (error) {
            console.log("Error del servidor", error);
            playfailSound();
            toast.error("Error al intentar iniciar sesión");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formErrors = validate(form);
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            postData();
        } else {
            toast.error("Por favor complete todos los campos requeridos.");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2 className={styles.h2}>Inicio de Sesión</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formContain}>
                    <label>Nombre de usuario:</label>
                    <input
                        value={form.username}
                        name="username"
                        type="text"
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                    {errors.username && <span>{errors.username}</span>}
                </div>
                <div className={styles.formContain}>
                    <label>Contraseña:</label>
                    <input
                        value={form.password}
                        name="password"
                        type="password"
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                    {errors.password && <span>{errors.password}</span>}
                </div>
                <button type="submit" className={styles.button}>Iniciar Sesión</button>
            </form>

            {/* Agrega el botón de Registrarse */}
            <div className={styles.signupLink}>
                ¿No tienes cuenta? <Link to="/register">Registrarse</Link>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Login;