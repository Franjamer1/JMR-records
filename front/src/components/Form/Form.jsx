import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styles from './Form.module.css';
import { addUserAppointments } from '../../redux/reducer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
    const dispatch = useDispatch();
    const userActive = useSelector(state => state.userActive);

    const [formData, setFormData] = React.useState({
        date: '',
        time: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token"); // 🔑 obtenemos el token guardado

        try {
            console.log("Token enviado al backend:", token);
            const response = await axios.post(
                'http://localhost:3000/turns/schedule',
                {
                    date: formData.date,
                    time: formData.time,
                    userId: userActive.id // Enviar el ID del usuario desde el store
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}` // 👈 enviamos el token al backend
                    }
                }
            );

            if (response.status === 201) {
                toast.success('Turno creado con éxito');
                dispatch(addUserAppointments(response.data));
                e.target.reset();
            } else {
                toast.error('No se pudo crear el turno');
            }
        } catch (error) {
            console.error('Error al crear turno:', error);
            toast.error('Error al crear turno. Por favor, intenta nuevamente.');
        }
    };

    // Validación de fecha: permitir solo fechas a partir del día siguiente
    const minDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        return today.toISOString().split('T')[0];
    };

    return (
        <section className={styles.FormContainer}>
            <h2>Crear Nuevo Turno</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.FormGroup}>
                    <label htmlFor="date">Fecha:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        min={minDate()}
                        required
                    />
                </div>
                <div className={styles.FormGroup}>
                    <label htmlFor="time">Hora:</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                        onInvalid={(e) => {
                            e.target.setCustomValidity(
                                'La hora debe estar entre las 10:00 AM y las 10:00 PM.'
                            );
                        }}
                        onInput={(e) => e.target.setCustomValidity('')}
                    />
                </div>
                <button type="submit" className={styles.boton}>Crear Turno</button>
            </form>
            <ToastContainer />
        </section>
    );
};

export default Form;