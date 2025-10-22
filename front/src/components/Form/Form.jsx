
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import styles from './Form.module.css';
// import { addUserAppointments } from '../../redux/reducer';

// const Form = () => {
//     const dispatch = useDispatch();
//     const userActive = useSelector(state => state.userActive);

//     const [formData, setFormData] = useState({
//         date: '',
//         time: ''
//     });

//     const handleInputChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:3000/appointment/schedule', {
//                 date: formData.date,
//                 time: formData.time,
//                 userId: userActive.id // Enviar el ID del usuario desde el store
//             });

//             if (response.status === 201) {
//                 // Actualizar el estado de las citas del usuario
//                 dispatch(addUserAppointments(response.data)); // Puedes adaptar según la respuesta del servidor
//                 alert('Turno creado con éxito');
//                 // Puedes redireccionar aquí si es necesario
//             } else {
//                 alert('No se pudo crear el turno');
//             }
//         } catch (error) {
//             console.error('Error al crear turno:', error);
//             alert('Error al crear turno. Por favor, intenta nuevamente.');
//         }
//     };

//     return (
//         <section className={styles.FormContainer}>
//             <h2>Crear Nuevo Turno</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className={styles.FormGroup}>
//                     <label htmlFor="date">Fecha:</label>
//                     <input
//                         type="date"
//                         id="date"
//                         name="date"
//                         value={formData.date}
//                         onChange={handleInputChange}
//                         required
//                     />
//                 </div>
//                 <div className={styles.FormGroup}>
//                     <label htmlFor="time" >Hora:</label>
//                     <input
//                         className={styles.input}
//                         type="time"
//                         id="time"
//                         name="time"
//                         value={formData.time}
//                         onChange={handleInputChange}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className={styles.boton}>Crear Turno</button>
//             </form>
//         </section>
//     );
// };

// export default Form;

// components/Form.jsx
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

        try {
            const response = await axios.post('http://localhost:3000/turns/schedule', {
                date: formData.date,
                time: formData.time,
                userId: userActive.id // Enviar el ID del usuario desde el store
            });

            if (response.status === 201) {
                toast.success('Turno creado con éxito');
                dispatch(addUserAppointments(response.data));
                e.target.reset(); // Limpiar el formulario después de enviar
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