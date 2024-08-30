import { Negocio } from './Negocio';

export interface Mesa {
  Id: number;
  Estado: EstadoMesa;
  Numero: Number;
  negocioMesa: Negocio;
}

export enum EstadoMesa {
  disponible = 1,
  ocupado = 2,
  pendientePago = 3,
}
