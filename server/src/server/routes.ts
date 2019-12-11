import { EndPoint } from "../tool/endpoint";

// Importar Rutas aquí
import { usuarioGetAll } from "../controllers/usuario";

export const routes: EndPoint[] = [
    usuarioGetAll
]