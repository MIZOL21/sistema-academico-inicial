export interface Student {
  id: number;
  cedula: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  fechaNacimiento: string;
  promedio?: number;
  asistencia?: number;
}
