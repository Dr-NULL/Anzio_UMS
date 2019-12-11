import { File } from "./file";
import { Path } from "./config";
import { Secret } from "./secret";
import { Usuario } from "../models/usuario";

//Base 64
import atob from "atob";
import btoa from "btoa";
import Log from "./log";

export class Corrupted {
    private encr: Secret
    private file: File
    constructor(){
        //Desencriptar archivo
        this.file = new File(Path.Data.corrupted)
        let byte: Buffer = this.file.readSync()
        let base: string
        for (let i = 0; i < 5; i++) {
            base = atob(byte.toString("utf8"))
            byte = Buffer.from(base)
        }

        //Get Raw Data
        base = byte.toString("utf8")
        let raw: {
            key: Array<number>,
            iv: Array<number>
        } = JSON.parse(base)

        //Setting Ecrypter
        this.encr = new Secret()
        this.encr.key = raw.key
        this.encr.iv = raw.iv
    }

    public encode(input: any) {
        let raw = JSON.stringify({
            d: input
        })
        return this.encr.encrypt(raw)
    }

    public decode(input: string) {
        let raw = this.encr.decrypt(input)
        let json = JSON.parse(raw)
        return json.d 
    }
}

export function setup(){
    Log.ev("Iniciando generador de encriptación...")

    //Crear nuevo archivo
    let file = new File(Path.Data.corrupted)
    if (file.exist) {
        Log.er("El archivo ya existe, no se modificará el archivo...")
        process.exit()
    } else {
        file.new()
    }
    
    //Crear datos en bruto
    let encr = new Secret()
    let data = {
        key: encr.key,
        iv: encr.iv
    }

    //Base 64
    let byte: Buffer = Buffer.from(JSON.stringify(data))
    let base: string
    for (let i = 0; i < 5; i++) {
        base = btoa(byte)
        byte = Buffer.from(base)
    }
    file.writeSync(byte)
    Log.ok("Archivo creado!")
    process.exit()
}