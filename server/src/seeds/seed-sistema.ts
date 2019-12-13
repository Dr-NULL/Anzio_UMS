import { Seed } from "../tool/orm";
import { Sistema } from "../models/sistema";

export const seedSistema = new Seed(Sistema)
seedSistema.data = [
    {
        nombre: "User manager System",
        descripc: "Es un gestor de usuarios, el cual es alimentado por RRHH, " +
                  "el cual permite establecer los permisos de acceso para cada " +
                  "trabajador de Frigosorno.",
        db: "SYS_UMS",
        url: "http://localhost:4200"
    },
    {
        nombre: "Anzio Etiquetas China",
        descripc: "Permite la gestión y reimpresión de etiquetas de exportación " +
                  "a China.",
        db: "SYS_ETIQ",
        url: "http://192.168.20.218"
    }
]