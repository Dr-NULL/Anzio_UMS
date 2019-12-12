import { Cargo } from './cargo';
import { Area } from './area';
import { Sexo } from './sexo';

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
  genero: Sexo;
  cargo: Cargo;
  area: Area;
}
