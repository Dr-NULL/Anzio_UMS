import { Sistema } from './sistema';
import { Perfil } from './perfil';

export interface Menu {
  id: number;
  nombre: string;
  descripc: string;
  url: string;
  icono: string;
  children?: Menu[];
  parent?: Menu;
  sistema?: Sistema;
  perfil?: Perfil[];
}
