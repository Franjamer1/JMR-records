import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminLayout.module.css"; // Reutilizamos estilos de layout y sidebar
import Appointment from "../../components/Appointment/Appointment"; // Reutilizamos card de turnos

const AdminHome = () => {
    const [latestTurnos, setLatestTurnos] = useState([]);
    const [totalUsuarios, setTotalUsuarios] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                // Obtener los últimos 5 turnos
                const turnosRes = await axios.get("http://localhost:3000/turns", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // Ordenamos por fecha ascendente y tomamos los 5 próximos
                const sortedTurnos = turnosRes.data.sort(
                    (a, b) => new Date(a.date) - new Date(b.date)
                );
                setLatestTurnos(sortedTurnos.slice(0, 5));

                // Obtener total de usuarios
                const usersRes = await axios.get("http://localhost:3000/users", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTotalUsuarios(usersRes.data.length);
            } catch (error) {
                console.error("Error fetching admin data", error);
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className={styles.adminContent}>
            {/* <h2>ADMIN</h2> */}
            <h2>Próximos Turnos</h2>
            <div className={styles.dashboard}>
                {/* <div className={styles.statsCard}>
                    <h3>Total de Usuarios</h3>
                    <p>{totalUsuarios}</p>
                </div> */}
                <div className={styles.statsCard}>
                    <div className={styles.cardsAppointment}>

                        {latestTurnos.length ? (
                            latestTurnos.map(({ id, date, time, userId, status }) => (
                                <Appointment
                                    key={id}
                                    id={id}
                                    date={formatDate(date)}
                                    time={time}
                                    userId={userId}
                                    status={status}
                                />
                            ))
                        ) : (
                            <p>No hay turnos próximos</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
