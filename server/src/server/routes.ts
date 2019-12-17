import { EndPoint } from "../tool/endpoint";

// Importar Rutas aquí
import * as Usuario from "../controllers/usuario";
import * as Area from "../controllers/area";
import * as Cargo from "../controllers/cargo";
import * as CSV from "../controllers/csv";

export const routes: EndPoint[] = [
    Usuario.login,
    Usuario.getAll,
    Usuario.getById,
    Usuario.getActive,
    Usuario.gotoSetup,
    Usuario.setSystemPass,
    Area.getAll,
    Area.getById,
    Cargo.getAll,
    Cargo.getById,
    CSV.upload
]