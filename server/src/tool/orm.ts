import { createConnection, BaseEntity, Repository } from "typeorm";

interface iClass<T extends BaseEntity> {
    new(): T
}

export class Seed<T extends BaseEntity>{
    public data: Array<{[K in keyof T]?: T[K]}>
    public action: (cls: new() => T, rep: Repository<T>) => void
    public type: iClass<T>

    constructor(entity: iClass<T>) {
        this.type = entity
        this.data = []
    }
}

import { Config } from "./config";
import Log from "../tool/log";

export async function deploy(
    entitiesClear: Seed<BaseEntity>[],
    entitiesInsert: Seed<BaseEntity>[],
    entitiesAction: Seed<BaseEntity>[]
){
    const orm = await createConnection(Config.Orm)

    //Limpiar Entidades
    console.clear()
    Log.ev("Comenzando Limpieza de Entidades:")
    for (let inst of entitiesClear) {
        let rep = orm.getRepository(inst.type)
        await rep.delete({})
        Log.ok(`Entidad lista -> [#${inst.type.name}]`)
    }

    //Llenar Entidades
    Log.ln()
    Log.ev(`Comenzando Inserción de data:`)
    for (let inst of entitiesInsert) {
        let rep = orm.getRepository(inst.type)
        for (let obj of inst.data) {
            await rep.save(obj)
        }

        Log.ok(`Entidad lista -> [#${inst.type.name}]`)
    }

    //Ejecutar acciones de Entidades
    Log.ln()
    Log.ev(`Comenzando ejecuciones finales:`)
    for (let inst of entitiesAction) {
        if (inst.action != null) {
            let rep = orm.getRepository(inst.type)
            inst.action(inst.type, rep)
    
            Log.ok(`Entidad lista -> [#${inst.type.name}]`)
        }
    }

    Log.ln()
    Log.ok("Proceso finalizado!")
    await orm.close()
}