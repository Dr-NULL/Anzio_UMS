import { Seed, deploy } from "../tool/orm";

//Función de Despliegue
export function deploySeeds() {
    deploy(
        entitiesClear,
        entitiesInsert,
        entitiesAction
    )
}
    
//Importar semillas aquí ↓↓↓
import { seedGenero } from "./seed-genero";
import { seedIntRRHH } from "./seed-int-rrhh";
import { seedArea } from "./seed-area";
import { seedCargo } from "./seed-cargo";
import { seedUsuario } from "./seed-usuario";

//Agregar el orden de limpieza aquí ↓↓↓
const entitiesClear: Seed<any>[] = [
    seedGenero,
    seedArea,
    seedIntRRHH
]

//Agregar el orden de inserción aquí ↓↓↓
const entitiesInsert: Seed<any>[] = [
    seedGenero,
    seedIntRRHH
]

//Agregar el orden de inserción aquí ↓↓↓
const entitiesAction: Seed<any>[] = [
    seedArea,
    seedCargo,
    seedUsuario
]