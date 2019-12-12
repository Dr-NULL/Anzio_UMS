import { Genero } from './genero';
import { Cargo } from './cargo';
import { Area } from './area';

export interface Usuario {
  id: number;
  nick: string;
  pass: string;
  token: string;
  email: string;
  isActive: boolean;
  rut: string;
  nombres: string;
  apellidoP: string;
  apellidoM: string;
  fechaNacim: Date;
  fechaCreac: Date;
  genero: Genero;
  cargo: Cargo;
  area: Area;
}
