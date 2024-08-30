import { Duenyo } from './Duenyo';
export interface Empresa {
  idEmpresa: string;
  cif: string;
  nombre: string;
  direccion: string;
  email: string;
  fechaconstitucion: Date;
  telefono: string;
  provincia: string;
  cp:string;
  duenyo: Duenyo;
  ciudad:string;
}
