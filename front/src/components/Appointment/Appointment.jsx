import React from "react";
import axios from "axios";
import styles from "./Appointment.module.css";
import { useDispatch } from "react-redux";
import { cancelAppointmentAction } from "../../redux/reducer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Appointment = ({ id, date, time, userName, status, onCancel, adminView = false }) => {
    const dispatch = useDispatch();

    const cancelAppointment = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `http://localhost:3000/turns/cancel/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                dispatch(cancelAppointmentAction(id));
                toast.success("Turno cancelado con éxito");

                // 🔹 Solo para vista admin: actualiza el estado local
                if (adminView && onCancel) onCancel(id);
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
                <p><strong>Fecha:</strong> {date}</p>
                <p><strong>Hora:</strong> {time}</p>
                {userName && <p><strong>Usuario:</strong> {userName}</p>}
                <p><strong>Estado:</strong> {status?.toUpperCase()}</p>

                {status !== "Cancelled" && (
                    <button onClick={cancelAppointment}>Cancelar</button>
                )}
            </article>
            <ToastContainer />
        </section>
    );
};

export default Appointment;
