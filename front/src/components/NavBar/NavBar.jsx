// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import styles from "./NavBar.module.css";
// import Logo from "../../assets/Logo.png";
// import { useSelector, useDispatch } from "react-redux";
// import { removeUser } from "../../redux/reducer"; // Importa la acción para cerrar sesión

// function NavBar() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const isLoggedIn = useSelector((state) => state.isLoggedIn); // Obtener el estado isLoggedIn desde Redux

//     const handleLogout = () => {
//         dispatch(removeUser()); // Llama a la acción de cerrar sesión
//         navigate("/"); // Redirige a la página de inicio
//     };

//     return (
//         <div>
//             <nav className={styles.nav}>
//                 <Link to="/home">
//                     <img className={styles.logo} src={Logo} alt="Logo" />
//                 </Link>
//                 <h1 className={styles.h1}>records</h1>
//                 <div className={styles.anchords}>
//                     {isLoggedIn && (
//                         <Link to="/home" className={styles.link}>
//                             <button className={styles.button}>
//                                 Home
//                             </button>
//                         </Link>
//                     )}
//                     {isLoggedIn && (
//                         <Link to="/appointments" className={styles.link}>
//                             <button className={styles.button}>
//                                 Mis Turnos
//                             </button>
//                         </Link>
//                     )}
//                     {isLoggedIn && (
//                         <button onClick={handleLogout} className={styles.button}>
//                             <span className={styles.ok}>•</span>
//                             Log Out
//                         </button>
//                     )}
//                     {!isLoggedIn && (
//                         <Link to="/" className={styles.link}>
//                             <button className={styles.button}>
//                                 <span className={styles.dot}>•</span>
//                                 Login
//                             </button>
//                         </Link>
//                     )}
//                 </div>
//             </nav>
//         </div>
//     );
// }

// export default NavBar;

import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import Logo from "../../assets/Logo.png";

function NavBar({ isLoggedIn, userRole, onLogout }) {
    return (
        <nav className={styles.nav}>
            <Link to={userRole === "admin" ? "/admin/home" : "/home"}>
                <img className={styles.logo} src={Logo} alt="Logo" />
            </Link>
            <h1 className={styles.h1}>records</h1>
            <div className={styles.anchords}>
                {/* Si no está logueado */}
                {!isLoggedIn && (
                    <Link to="/" className={styles.link}>
                        <button className={styles.button}>
                            <span className={styles.dot}>•</span> Login
                        </button>
                    </Link>
                )}

                {/* Si es usuario normal */}
                {isLoggedIn && userRole === "user" && (
                    <>
                        <Link to="/home" className={styles.link}>
                            <button className={styles.button}>Home</button>
                        </Link>
                        <Link to="/appointments" className={styles.link}>
                            <button className={styles.button}>Turnos</button>
                        </Link>
                        <button onClick={onLogout} className={styles.button}>
                            <span className={styles.ok}>•</span> Log Out
                        </button>
                    </>
                )}

                {/* Si es admin */}
                {isLoggedIn && userRole === "admin" && (
                    <button onClick={onLogout} className={styles.button}>
                        <span className={styles.ok}>•</span> Log Out
                    </button>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
