import React, { useState, useEffect } from "react";
import styles from "./carousel.module.css";

const images = [
    "https://images.pexels.com/photos/164755/pexels-photo-164755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/164907/pexels-photo-164907.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/4988137/pexels-photo-4988137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3784424/pexels-photo-3784424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.carousel}>
            <button className={styles.prev} onClick={prevSlide}>
                &#10094;
            </button>
            <img src={images[currentIndex]} alt="carousel" className={styles.image} />
            <button className={styles.next} onClick={nextSlide}>
                &#10095;
            </button>
        </div>
    );
}

export default Carousel;