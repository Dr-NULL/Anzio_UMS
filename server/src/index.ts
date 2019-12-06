//Configurar Alias
import { addAlias } from "module-alias";
addAlias(">", __dirname)

//Configurar ORM
import "reflect-metadata";
import { Log } from "./tool/log";
import { checkORM } from ">/tool/config";
import { deployServer } from ">/deploy/.";
import { createConnection, Connection } from "typeorm";
import express from "express";

export let orm: Connection = null
export const app = express()

checkORM()
createConnection().then(async conn => {
    //Exponer conexión
    orm = conn

    //Configurar server
    deployServer()

}).catch(fail => {
    Log.er("FATAL [ORM]:")
    console.log(fail)
})

