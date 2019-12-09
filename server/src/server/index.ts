import express from "express";
import { createConnection, Connection } from "typeorm";

import Log from "../tool/log"
import { Path, Config } from "../tool/config"

import { crossover } from "session-crossover";
import cors, { CorsOptions } from "cors";
import { urlencoded, json  } from "body-parser";

export const app = express()
export let orm: Connection

export async function deploy() {
    try {
        //Inicializar Modelos
        const confOrm = Config.Orm
        orm = await createConnection(confOrm)
    
        //Configurar Body Parser
        app.use(urlencoded({ extended: false }))
        app.use(json({ strict: false }))
        
        //Habilitar CORS
        const corsOpt: CorsOptions = {
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: (origin, callback) => {
                const allowed = Config.App.Server.Cors
                if (allowed.includes(origin)) {
                    callback(null, true)
                }
            }
        }
        app.use(cors(corsOpt))
        app.options("*", cors(corsOpt))
    
        //Establecer Session
        app.use(crossover({
            cookieName: "session",
            expires: 30,
            isEncrypted: true,
            path: Path.Data.session
        }))
    
        //Levantar servidor
        app.listen(Config.App.Server.port, () => {
            Log.title("Anzio UMS")
            Log.ev("Servidor preparado!")
            Log.ln("Esperando peticiones...")
        })
    } catch(err) {
        Log.er("Error al levantar el servidor!")
        Log.ln(err)
    }
}