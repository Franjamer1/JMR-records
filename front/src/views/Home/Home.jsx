// import NavBar from "../../components/NavBar/NavBar";
// import Carousel from "../../components/carousel/carousel";
// import styles from "./Home.module.css"

// function Home() {
//     return (
//         <div className={styles.home}>
//             {/* <NavBar /> */}
//             <h1>SOLICITA TU TURNO</h1>
//             <p>Solicita tu turno para grabaciones vocales, guitarras, bajo, piano, vientos, percusiones. Reserva para producciones completas, mezcla y mastering</p>

//             <Carousel />
//         </div >
//     )
// };

// export default Home;

import React, { useEffect } from "react";
import Carousel from "../../components/carousel/carousel";
import styles from "./Home.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form.jsx"


function Home() {
    const userData = useSelector((state) => state.userActive);
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica si userData.name no está presente y redirige a "/"
        if (!userData.name) {
            navigate("/");
        }
    }, [userData.name, navigate]);

    // Si userData.name no está presente, retorna null para evitar renderizado no deseado
    if (!userData.name) {
        return null;
    }

    // Si userData.name está presente, renderiza el contenido de Home
    return (
        <div className={styles.home}>
            <Carousel />
            <div className={styles.turnContainer}>
                <h1>SOLICITA TU TURNO</h1>
                <p>Solicita tu turno para grabaciones vocales, guitarras, bajo, piano, vientos, percusiones. Reserva para producciones completas, mezcla y mastering</p>
                <Form />
            </div>
        </div>
    );
}

export default Home;
