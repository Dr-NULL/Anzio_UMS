import express from "express";
import { createConnection, Connection } from "typeorm";
import { Config } from "../tool/config";
import { Log } from "../tool/log";

//Lanzamiento de configuraciones
import { deploySession } from "./deploy-session";
import { deployRoutes } from "./deploy-routes";

//Exportar constantes
export const app = express()
export var orm: Connection = null

//Desplegar servidor
export async function deployServer() {
    //Levantar TypeORM
    orm = await createConnection()
    
    //Ejecutar despliegues
    deploySession()
    deployRoutes()

    app.listen(Config.Server.port, () => {
        Log.title("Anzio UMS")
        Log.ok("Servidor preparado")
    })
}