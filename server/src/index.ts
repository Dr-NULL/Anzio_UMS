import { deploy as deployServer } from "./server/";
import { deploy as deploySeeds } from "./seeds/";

//Agregar Parámetros en blanco
while (process.argv.length < 10) { 
    process.argv.push("")
}

//Modos de arranque
switch(process.argv[2].trim()){
    case "seeds":
        deploySeeds()
        break
    default:
        deployServer()
        break
}