import React from "react";
import { Link, Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./AdminLayout.module.css";

const AdminLayout = () => {
    return (
        <div className={styles.adminContainer}>
            <div className={styles.mainContent}>
                <aside className={styles.sidebar}>
                    <ul className={styles.menu}>
                        <li><Link to="/admin/home" className={styles.link}><button className={styles.button}>Home</button></Link></li>
                        <li><Link to="/admin/turnos" className={styles.link}><button className={styles.button}>Turnos</button> </Link></li>
                        <li><Link to="/admin/usuarios" className={styles.link}><button className={styles.button}>Usuarios</button></Link></li>
                        {/* <li><Link to="/logout" className={styles.link}><button className={styles.button}>Turnos</button></Link></li> */}
                    </ul>
                </aside>
                <section className={styles.content}>
                    <Outlet /> {/* Aquí se renderizan las sub-rutas */}
                </section>
            </div>
        </div>
    );
};

export default AdminLayout;
