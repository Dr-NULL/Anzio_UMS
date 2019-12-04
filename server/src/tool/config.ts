import { join } from "path";
import { File } from "./file";
import { Log } from "./log";

export interface iDatabase {
    host: string;
    username: string;
    password: string;
    database: string;
    dialect: "mysql"|"sqlite"|"postgres"|"mssql"
}

//Exponer Rutas
export module Path {
    export const root = join(__dirname, "..", "..", "..").replace(/\\/gi, "/") + "/"
    export const client = root + "client/"
    export const server = root + "server/"
}

const raw = load()
export const Database = {
    debug: raw.debug,
    test: raw.test,
    production: raw.production
}

function load(): {
    debug: iDatabase;
    test: iDatabase;
    production: iDatabase;
} {
    const json: File = new File(Path.root + "config.json")
    if (!json.exist) {
        //Crear Nuevo archivo
        json.new()
        json.writeTextSync(
`{
    "debug": {
        "host": "192.168.0.1",              /* IP donde está alojada la base de datos */
        "username": "test",                 /* Usuario de la base de datos */
        "password": "test",                 /* Password de la base de datos */
        "database": "db_test",              /* Nombre de la base de datos */
        "dialect": "type"                   /* Tipo de base de Datos ("mysql"|"sqlite"|"postgres"|"mssql") */
    },
    "test": {
        "host": "192.168.0.1",              /* IP donde está alojada la base de datos */
        "username": "test",                 /* Usuario de la base de datos */
        "password": "test",                 /* Password de la base de datos */
        "database": "db_test",              /* Nombre de la base de datos */
        "dialect": "type"                   /* Tipo de base de Datos ("mysql"|"sqlite"|"postgres"|"mssql") */
    },
    "production": {
        "host": "192.168.0.1",              /* IP donde está alojada la base de datos */
        "username": "test",                 /* Usuario de la base de datos */
        "password": "test",                 /* Password de la base de datos */
        "database": "db_test",              /* Nombre de la base de datos */
        "dialect": "type"                   /* Tipo de base de Datos ("mysql"|"sqlite"|"postgres"|"mssql") */
    }
}`
        )

        Log.er("No se encontró un archivo de conexión.")
        Log.ln("Se ha creado un nuevo archivo de conexión en ")
        Log.ln("la raíz del proyecto.")

        process.abort()
        Log.ln("Fin de la Ejecución...")
    } else {
        //Cargar data en memoria
        try {
            let str = json.readTextSync().replace(/\/\*.+\*\//gi, "")
            return JSON.parse(str)
        } catch {
            Log.er("Imposible parsear el contenido del archivo.")
            Log.ln("Fin de la Ejecución...")
            process.abort()
        }
    }
}