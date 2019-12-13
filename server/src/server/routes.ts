import { EndPoint } from "../tool/endpoint";

// Importar Rutas aquí
import * as Usuario from "../controllers/usuario";
import * as Area from "../controllers/area";
import * as Cargo from "../controllers/cargo";

export const routes: EndPoint[] = [
    Usuario.getAll,
    Usuario.getById,
    Usuario.getActive,
    Area.getAll,
    Area.getById,
    Cargo.getAll,
    Cargo.getById
]