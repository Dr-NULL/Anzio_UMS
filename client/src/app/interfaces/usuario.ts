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
  isSystem: boolean;
  isAdmin: boolean;
  rut: string;
  nombres: string;
  apellidoP: string;
  apellidoM: string;
  fechaNacim: Date;
  fechaInserc: Date;
  fechaElimin: Date;
  fechaActivac: Date;
  fechaDesact: Date;
  genero: Sexo;
  cargo: Cargo;
  area: Area;
}
