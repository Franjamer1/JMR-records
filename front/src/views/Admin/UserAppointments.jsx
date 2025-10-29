import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Appointment from "../../components/Appointment/Appointment";
import styles from "./AdminLayout.module.css";
import api from "../../config/api";

const UserAppointments = () => {
    const { id } = useParams(); // ID del usuario seleccionado
    const [turnos, setTurnos] = useState([]);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const fetchUserAppointments = async () => {
            try {
                const token = localStorage.getItem("token");

                // Obtener datos del usuario
                const userRes = await api.get(`/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserName(userRes.data.name);
                setTurnos(userRes.data.appointments);
            } catch (error) {
                console.error("Error fetching user appointments:", error);
            }
        };

        fetchUserAppointments();
    }, [id]);

    // Función para actualizar el estado al cancelar un turno
    const handleCancel = (turnoId) => {
        setTurnos((prev) =>
            prev.map((t) => (t.id === turnoId ? { ...t, status: "Cancelled" } : t))
        );
    };

    // Formateo de fecha a dd/MM/yyyy
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className={styles.adminContent}>
            <h2>Turnos de {userName}</h2>
            <div className={styles.turnosContainer}>
                {turnos.length ? (
                    turnos.map(({ id, date, time, status, userId }) => (
                        <Appointment
                            key={id}
                            id={id}
                            date={formatDate(date)}
                            time={time}
                            userId={userId}
                            status={status}
                            onCancel={() => handleCancel(id)}
                        />
                    ))
                ) : (
                    <p>Este usuario no tiene turnos</p>
                )}
            </div>
        </div>
    );
};

export default UserAppointments;
