export interface UsuarioInt {
  rut: string;
  nombres: string;
  apellidoP: string;
  apellidoM: string;
  area: string;
  cargo: string;
  sexo: string;
  fechaNacim: Date;
  rutJefe?: string;
  email?: string;
}
