export interface CreateAppointmentRequest{
  startDate: Date,
  endDate: Date,
  patientId: number,
  doctorId: number
}
