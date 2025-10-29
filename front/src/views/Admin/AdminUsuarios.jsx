import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./AdminLayout.module.css";

const AdminUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/users", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsuarios(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsuarios();
    }, []);

    return (
        <div className={styles.adminContent}>
            <h2>Usuarios</h2>
            <div className={styles.usersContainer}>
                {usuarios.length ? (
                    usuarios.map(({ id, name, email, role }) => (
                        <Link
                            key={id}
                            to={`/admin/usuarios/${id}`}
                            className={styles.userCard}
                        >
                            <h3>{name}</h3>
                            <p>{email}</p>
                            <p>Rol: {role}</p>
                        </Link>
                    ))
                ) : (
                    <p>No hay usuarios registrados</p>
                )}
            </div>
        </div>
    );
};

export default AdminUsuarios;
