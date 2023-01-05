import { Negocio } from "./Negocio";

export interface Empleado {
  dni: string;
  nombre: string;
  apellidos: string;
  email: string;
  pass: string;
  foto: string;
  negocioEmpleado: Negocio;
}
