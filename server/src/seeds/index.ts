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
import { seedSexo } from "./seed-sexo";
import { seedIntRRHH } from "./seed-int-rrhh";
import { seedArea } from "./seed-area";
import { seedCargo } from "./seed-cargo";
import { seedUsuario } from "./seed-usuario";

//Agregar el orden de limpieza aquí ↓↓↓
const entitiesClear: Seed<any>[] = [
    //Maestros
    seedUsuario,
    seedIntRRHH,

    //Paramétricas
    seedSexo,
    seedCargo,
    seedArea
]

//Agregar el orden de inserción aquí ↓↓↓
const entitiesInsert: Seed<any>[] = [
    //Paramétricas
    seedSexo,
    seedCargo,
    seedArea,
]

//Agregar el orden de inserción aquí ↓↓↓
const entitiesAction: Seed<any>[] = [
    //Maestros
    seedUsuario
]