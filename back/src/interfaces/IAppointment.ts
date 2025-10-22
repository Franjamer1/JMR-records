export enum AppointmentStatus {
    ACTIVE = "active",
    CANCELLED = "cancelled"
}

export interface IAppointment {
    id: number,
    date: string,
    time: string,
    userId: number,
    status: AppointmentStatus
};

// export default IAppointment;