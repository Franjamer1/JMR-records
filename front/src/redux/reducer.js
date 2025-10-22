

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userActive: {}, // Aquí se almacenará la información del usuario logueado
    isLoggedIn: false, // Estado para verificar si el usuario está autenticado o no
    userAppointments: []
};

export const userSlice = createSlice({
    name: "userData",
    initialState: initialState,
    reducers: {
        addUser: (state, action) => {
            state.userActive = action.payload;
            state.isLoggedIn = true; // Establecer isLoggedIn a true cuando el usuario inicia sesión
        },
        removeUser: (state) => {
            state.userActive = {};
            state.isLoggedIn = false; // Establecer isLoggedIn a false cuando el usuario cierra sesión
        },
        addUserAppointments: (state, action) => {
            state.userAppointments = action.payload;
        },
        cancelAppointmentAction: (state, action) => {
            state.userAppointments = state.userAppointments.map(appointment => {
                if (appointment.id === action.payload) {
                    return { ...appointment, status: "Cancelled" }
                }
                return appointment;
            });
        }
    }
});

export const { addUser, removeUser, addUserAppointments, cancelAppointmentAction } = userSlice.actions;

export default userSlice.reducer;


