import { Cliente } from "./Cliente";

export interface Factura {
  idFactura: string;
  numero: string;
  fecha: string;
  precio: string;
  descripcion: string;
  cliente: Cliente;
}
