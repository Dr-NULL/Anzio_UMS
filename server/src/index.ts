//Configurar Alias
import { addAlias } from "module-alias";
addAlias(">", __dirname)

//Configurar ORM
import "reflect-metadata";
import { Log } from "./tool/log";
import { checkORM } from ">/tool/config";
import { createConnection, Connection } from "typeorm";
import express from "express";


export let orm: Connection = null
export const app = express()

checkORM()
createConnection().then(async conn => {
    //Exponer conexión
    orm = conn



}).catch(fail => {
    Log.er("FATAL [ORM]:")
    console.log(fail)
})

