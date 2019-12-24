import { EndPoint } from "../tool/endpoint";

// Importar Rutas aquí
import * as Usuario from "../controllers/usuario";
import * as Area from "../controllers/area";
import * as Cargo from "../controllers/cargo";
import * as CSV from "../controllers/csv";
import * as Sistema from "../controllers/sistema";
import * as Menu from "../controllers/menu";

export const routes: EndPoint[] = [
    Usuario.login,
    Usuario.logout,
    Usuario.getAll,
    Usuario.getById,
    Usuario.getActive,
    Usuario.gotoSetup,
    Usuario.setSystemPass,
    Menu.getByDomain,
    Area.getAll,
    Area.getById,
    Cargo.getAll,
    Cargo.getById,
    CSV.upload,
    Sistema.getAll,
    Sistema.add
]