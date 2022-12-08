import { Negocio } from "./Negocio";

export interface Empleado {
  Dni: string;
  Nombre: string;
  Apellidos: string;
  Email: string;
  Pass: string;
  Foto: string;
  Negocio: Negocio;
}
