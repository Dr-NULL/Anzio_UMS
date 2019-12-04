import { File } from "./file";
import { join } from "path";
import Log from "./log";

export module Path {
    export const root = join(__dirname, "..", "..", "..").replace(/\\/gi, "/") + "/"
    export const server = root + "server/"
    export const client = root + "client/"
    
    export module source {
        const source = root + "source/"
        export const session = source + "session/"
    }
}

export function checkORM(){
    const json = new File(Path.server + "ormconfig.json")
    if (!json.exist) {
        json.new()
        json.writeTextSync(
`{
    "type": "mssql",
    "host": "1IP_HERE",
    "username": "USER_DB",
    "password": "PASS_DB",
    "database": "NAME_DB",
    "synchronize": false,
    "logging": false,
    "entities": [
       "build/model/**/*.js"
    ],
    "migrations": [
       "build/migration/**/*.js"
    ],
    "subscribers": [
       "build/subscriber/**/*.js"
    ],
    "cli": {
       "entitiesDir": "src/entity",
       "migrationsDir": "src/migration",
       "subscribersDir": "src/subscriber"
    }
 }`
        )

        Log.er(`No existe "ormconfig.json", se ha creado una copia en la raiz del server.`)
        Log.ln(`Ejecución finalizada...`)
        process.exit()
    }
}