import { setup as setupEncrypter } from "./tool/corrupted";
import { deployServer } from "./server/index";
import { deploySeeds } from "./seeds/index";

//Agregar Parámetros en blanco
while (process.argv.length < 10) { 
    process.argv.push("")
}

//Modos de arranque
console.clear()
switch(process.argv[2].trim()){
    case "seeds":
        deploySeeds()
        break
    case "setup":
        setupEncrypter()
        break
    default:
        deployServer()
        break
}