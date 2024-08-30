import { Negocio } from './Negocio';
import { Duenyo } from './Duenyo';

export interface Caja {
  Id: number;
  Saldo: string;
  Fondo: string;
  Descripcion: string;
  negocioCaja: Negocio;
  Duenyo: Duenyo;
}
