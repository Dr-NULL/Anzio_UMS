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
import { seedArea } from "./seed-area";
import { seedCargo } from "./seed-cargo";
import { seedUsuario } from "./seed-usuario";
import { seedSistema } from "./seed-sistema";
import { seedMenu } from "./seed-menu";

//Agregar el orden de limpieza aquí ↓↓↓
const entitiesClear: Seed<any>[] = [
    //Maestros
    seedUsuario,
    
    //Paramétricas
    seedSistema,
    seedCargo,
    seedArea,
    seedSexo
]

//Agregar el orden de inserción aquí ↓↓↓
const entitiesInsert: Seed<any>[] = [
    //Paramétricas
    seedSexo,
    seedCargo,
    seedArea,
    seedSistema
]

//Agregar el orden de ejecución aquí ↓↓↓
const entitiesAction: Seed<any>[] = [
    //Maestros
    seedUsuario,
    seedMenu
]