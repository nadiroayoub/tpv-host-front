import { Negocio } from "./Negocio";
import { Pedido } from './Pedido';

export interface Empleado {
  dni: string;
  nombre: string;
  apellidos: string;
  email: string;
  pass: string;
  foto: string;
  negocioEmpleado: Negocio;
  pedidos: Pedido[];
}
