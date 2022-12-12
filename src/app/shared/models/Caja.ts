import { Negocio } from './Negocio';
import { Duenyo } from './Duenyo';

export interface Caja {
  Saldo: string;
  Fondo: string;
  Descripcion: string;
  Negocio: Negocio;
  Duenyo: Duenyo;
}
