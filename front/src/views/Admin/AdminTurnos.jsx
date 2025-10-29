import React, { useEffect, useState } from "react";
import axios from "axios";
import Appointment from "../../components/Appointment/Appointment";
import styles from "./AdminLayout.module.css";
import api from "../../config/api";

const AdminTurnos = () => {
    const [turnos, setTurnos] = useState([]);

    useEffect(() => {
        const fetchTurnos = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get("/turns", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Ordena los turnos por fecha ascendente
                const sortedTurnos = response.data.sort(
                    (a, b) => new Date(a.date) - new Date(b.date)
                );

                setTurnos(sortedTurnos);
            } catch (error) {
                console.error("Error fetching turnos:", error);
            }
        };

        fetchTurnos();
    }, []);

    // 🔹 Actualiza el estado local al cancelar un turno
    const handleCancel = (id) => {
        setTurnos((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, status: "Cancelled" } : t
            )
        );
    };

    // 🔹 Formatea la fecha a dd/MM/yyyy
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className={styles.adminContent}>
            <h2>Todos los Turnos</h2>

            <div className={styles.turnosContainer}>
                {turnos.length ? (
                    turnos.map(({ id, date, time, user, status }) => (
                        <Appointment
                            key={id}
                            id={id}
                            date={formatDate(date)}
                            time={time}
                            userName={user?.name || "Desconocido"}
                            status={status}
                            onCancel={() => handleCancel(id)}
                            adminView={true} // 🔹 indica que es la vista admin
                        />
                    ))
                ) : (
                    <p>No hay turnos registrados</p>
                )}
            </div>
        </div>
    );
};

export default AdminTurnos;
