
import React, { useState, useEffect } from "react";
import Appointment from "../../components/Appointment/Appointment";
import styles from "./MyAppointments.module.css";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { addUserAppointments, cancelAppointmentAction } from "../../redux/reducer";

// Función para formatear la fecha a formato argentino
const formatToArgentinaDate = (dateString) => {
    // Obtener la fecha como objeto Date
    const date = new Date(dateString);

    // Obtener día, mes y año
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    // Formatear la fecha como dd/MM/yyyy
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
};

function MyAppointments() {
    // const [appointments, setAppointments] = useState([]);
    const userData = useSelector((state) => state.userActive);
    const appointments = useSelector((state) => state.userAppointments);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:3000/users/${userData.id}`);
    //             dispatch(addUserAppointments(response.data.appointments));
    //             // setAppointments(response.data.appointments)
    //         } catch (error) {
    //             console.error("Error fetching data", error)
    //         }
    //     };
    //     !userData.name ? navigate("/") : fetchData();
    // }, []);
    useEffect(() => {
        if (!userData.name) {
            navigate("/");
            return;
        }

        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `http://localhost:3000/users/${userData.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                dispatch(addUserAppointments(response.data.appointments));
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, [userData, navigate]);


    return (
        <div>

            <div className={styles.Appointment}>
                <h2 className={styles.h2}>Mis Turnos</h2>
                <div className={styles.Container}>
                    {appointments.length ? (
                        appointments?.map(({ id, date, time, userId, status }) => {
                            const formattedDate = formatToArgentinaDate(date);
                            return (
                                <Appointment
                                    key={id}
                                    id={id}
                                    date={formattedDate}
                                    time={time}
                                    userId={userId}
                                    status={status}
                                // onCancel={() => handleCancelAppointment(id)}
                                />
                            );
                        })
                    ) : (
                        <div className={styles.Alert}>No tienes ningun turno!</div>
                    )}
                </div>
            </div>

        </div>
    );
}

export default MyAppointments;


