import { Negocio } from "./Negocio";

// import { Duenyo } from './Duenyo';
export interface Cliente {
  idCliente: string;
  dni: string;
  nombre: string;
  apellidos: string;
  email:string;
  negocio: Negocio;
}
