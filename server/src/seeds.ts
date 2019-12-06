import { seed, execute } from "./seeds/core";
import { createCargos } from "./seeds/create-cargos";
import { createAreas } from "./seeds/create-area";
import { createSexo } from "./seeds/create-sexo";

export const queue: Array<seed<any>> = [
    createCargos,
    createAreas,
    createSexo
]

//Ejcutar insersión de data 
execute()