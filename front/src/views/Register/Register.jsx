import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validate } from "../../helpers/validate";
import axios from "axios";
import styles from "./Register.module.css"
import { useNavigate } from "react-router-dom";
import okSound from "../../assets/sounds/okSound.mp3"
import failSound from "../../assets/sounds/failSound.mp3"
import api from "../../config/api";

const Register = () => {
    const navigate = useNavigate();

    const initialState = {
        name: "",
        email: "",
        // birthdate: "",
        // nDni: "",
        username: "",
        password: "",
    };

    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const playokSound = () => {
        const audio = new Audio(okSound);
        audio.play();
    };

    const playfailSound = () => {
        const audioFail = new Audio(failSound);
        audioFail.play();
    };

    useEffect(() => {
        const errors = validate(form);
        setErrors(errors);
        checkFormValidity(errors);
    }, [form]);

    const checkFormValidity = (errors) => {
        const isValid = Object.values(form).every(value => value.trim() !== "") && Object.keys(errors).length === 0;
        setIsFormValid(isValid);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const postData = async () => {
        try {
            const response = await api.post("/users/register", form);

            if (response.status === 201) {
                toast.success("Usuario registrado correctamente");
                playokSound();
                setForm(initialState); // Reinicia el formulario después del registro exitoso
                setTimeout(() => {
                    navigate('/'); // Redirige al usuario al Login después de mostrar el toast
                }, 2000);
            } else {
                toast.error("El usuario no se ha podido registrar");
                playfailSound();
            }
        } catch (error) {
            console.log("Error del servidor", error);
            playfailSound();
            if (error.response && error.response.data.message === "Username already exists") {
                toast.error("El nombre de usuario ya está en uso. Por favor, elige otro.");
            } else {
                toast.error("Error, usuario o email ya está en uso");
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const currentErrors = validate(form);
        setErrors(currentErrors);

        if (Object.keys(currentErrors).length === 0) {
            postData();
        } else {
            toast.error("Por favor, corrige los errores antes de enviar el formulario.");
        }
    };

    return (
        <div className={styles.registerContainer}>
            <h2 className={styles.h2}>Registro de Usuarios</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                {
                    [
                        { label: "Nombre:", name: "name", type: "text" },
                        { label: "Nombre de usuario:", name: "username", type: "text" },
                        { label: "Email:", name: "email", type: "email" },
                        // { label: "Fecha de Nacimiento:", name: "birthdate", type: "date" },
                        // { label: "DNI:", name: "nDni", type: "number" },
                        { label: "Contraseña:", name: "password", type: "password" } // Cambiado a type="password"
                    ].map(({ label, name, type }) => (
                        <div key={name} className={styles.formContain}>
                            <label>{label}</label>
                            <input
                                value={form[name]}
                                name={name}
                                type={type}
                                onChange={handleChange}
                                required // Agregado el atributo required
                                className={styles.input} />
                            {errors[name] && <span className={styles.errorSpan}>{errors[name]}</span>}
                        </div>
                    ))
                }
                <button type="submit" className={styles.button} disabled={!isFormValid}>Registrar</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Register;
