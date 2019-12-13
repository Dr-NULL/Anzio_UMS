import express from "express";
import { createConnection, Connection } from "typeorm";
import { Config } from "../tool/config";
import { Log } from "../tool/log";

//Lanzamiento de configuraciones
import { deployCorrupted } from "./deploy-corrupted";
import { deploySession } from "./deploy-session";
import { deployRoutes } from "./deploy-routes";
import { deployJson } from "./deploy-json";
import { deployCors } from "./deploy-cors";

//Exportar constantes
export const app = express()
export var orm: Connection = null

//Desplegar servidor
export async function deployServer() {
    //Levantar TypeORM
    orm = await createConnection(Config.Orm)
    
    //Ejecutar despliegues
    deployCorrupted()
    deployJson()
    deployCors()
    deploySession()
    deployRoutes()

    app.listen(Config.App.Server.port, () => {
        Log.title("Anzio UMS")
        Log.ok("Servidor preparado")
    })
}