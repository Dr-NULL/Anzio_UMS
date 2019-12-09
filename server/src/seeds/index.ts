import { Seed, deploy as deploySeeds } from "../tool/orm";

//Función de Despliegue
export function deploy() {
    deploySeeds(
        entitiesClear,
        entitiesInsert,
        entitiesAction
    )
}
    
//Importar semillas aquí ↓↓↓
import { seedGenero } from "./seed-genero";
import { seedIntRRHH } from "./seed-int-rrhh";

//Agregar el orden de limpieza aquí ↓↓↓
const entitiesClear: Seed<any>[] = [
    seedGenero,
    seedIntRRHH
]

//Agregar el orden de inserción aquí ↓↓↓
const entitiesInsert: Seed<any>[] = [
    seedGenero,
    seedIntRRHH
]

//Agregar el orden de inserción aquí ↓↓↓
const entitiesAction: Seed<any>[] = [
    seedIntRRHH
]