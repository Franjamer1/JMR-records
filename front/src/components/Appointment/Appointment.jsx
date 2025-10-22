

import React from "react";
import axios from "axios";
import styles from "./Appointment.module.css";
import { useDispatch } from "react-redux";
import { cancelAppointmentAction } from "../../redux/reducer";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Appointment = ({ id, date, time, userId, status, onCancel }) => {
    const dispatch = useDispatch();

    const cancelAppointment = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/turns/cancel/${id}`);
            if (response.status === 200) {
                dispatch(cancelAppointmentAction(id));
                toast.success("Turno cancelado con éxito");
            } else {
                toast.error("No se pudo cancelar el turno");
            }
        } catch (error) {
            console.error("Error al cancelar el turno", error);
            toast.error("Error al cancelar el turno");
        }
    };

    return (
        <section className={styles.CardContainer}>
            <article className={styles.Card}>
                <p>{date}</p>
                <p>{time}</p>
                <p>{status?.toUpperCase()}</p>
                {status !== "Cancelled" && (
                    <button onClick={cancelAppointment}>Cancelar</button>
                )}
            </article>
            <ToastContainer />
        </section>
    );
};

export default Appointment;