import { Corrupted } from "../tool/corrupted";
import { Path } from "../tool/config";
import { File } from "../tool/file";
import { Log } from "../tool/log";

export function deployCorrupted(){
    const corrupted = new File(Path.Data.corrupted)

    //Comprobar existencia del archivo
    if (!corrupted.exist) {
        Log.er("El archivo con las llaves no existe.")
        Log.ln("Puede crearlas manualmente ejecutando:")
        Log.ln(`"npm start setup" (sin comillas)`)

        process.exit()
    }

    //comprobando integridad del archivo
    try {
        const key = new Corrupted()
        key.encode("testeando :^)")
    } catch {
        Log.er("El archivo está dañado")
        Log.ln("Debe de volver a crear las llaves. Para")
        Log.ln("ello ejecute el siguiente comando:")
        Log.ln(`"npm start setup" (sin comillas)`)
        
        corrupted.kill()
        process.exit()
    }
}