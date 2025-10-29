export const validate = (formData) => {
    const errors = {};
    const emailregex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!formData.name) {
        errors.name = "El nombre es requerido";
    }

    if (!formData.username) {
        errors.username = "El nombre de usuario es requerido";
    }

    if (!formData.email) {
        errors.email = "El email es requerido";
    } else if (!emailregex.test(formData.email)) {
        errors.email = "Ingresa un email válido (ej: ejemplo@gmail.com)";
    }

    // if (!formData.birthdate) {
    //     errors.birthdate = "La fecha de nacimiento es requerida";
    // }

    // if (!formData.nDni) {
    //     errors.nDni = "El DNI es requerido";
    // }

    if (!formData.password) {
        errors.password = "La contraseña es requerida";
    }

    return errors;
};