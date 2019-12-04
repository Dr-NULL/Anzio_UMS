//Configurar alias de rutas
import { addAlias } from "module-alias";
addAlias(">", __dirname)

//Variables iniciales
import express from "express";
import { Service } from ">/tool/service";

//Servicios
import { srvHolaMundo } from ">/services/hola-mundo";
export const app = express()
export const srv: Service[] = [
    srvHolaMundo
]

//Configurar Servidor
import * as Deploy from "./deploy/";
import Log from "./tool/log";
Deploy.configSession()
Deploy.configBodyParser()
Deploy.configServices()

//Levantar Servidor
app.listen(80, () => {
    console.clear()
    Log.title()
    Log.ok("Servidor listo...")
})