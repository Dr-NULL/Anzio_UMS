import { createConnection, BaseEntity, Repository } from "typeorm";

interface iClass<T extends BaseEntity> {
    new(): T
}

export class Seed<T extends BaseEntity>{
    public data: Array<{[K in keyof T]?: T[K]}>
    public action: (rep: Repository<T>) => void | Promise<void>
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
    const orm = await createConnection()

    //Limpiar Entidades
    console.clear()
    Log.ev("Comenzando Limpieza de Entidades:")
    for (let inst of entitiesClear) {
        try {
            Log.ok(`Procesando Entidad -> [#${inst.type.name}]`)
            let rep = orm.getRepository(inst.type)
            await rep.delete({})
        } catch (err) {
            Log.er('Error en la ejecución de "Actions":')
            Log.ln(err + "\n")
            process.exit()
        }
    }

    //Llenar Entidades
    Log.ln()
    Log.ev(`Comenzando Inserción de data:`)
    for (let inst of entitiesInsert) {
        try {
            Log.ok(`Procesando Entidad -> [#${inst.type.name}]`)
            let rep = orm.getRepository(inst.type)
            for (let obj of inst.data) {
                await rep.save(obj)
            }
        } catch(err) {
            Log.er('Error en la ejecución de "Actions":')
            Log.ln(err + "\n")
            process.exit()
        }
    }

    //Ejecutar acciones de Entidades
    Log.ln()
    Log.ev(`Comenzando ejecuciones finales:`)
    for (let inst of entitiesAction) {
        if (inst.action != null) {
            Log.ok(`Procesando Entidad -> [#${inst.type.name}]`)
            let rep = orm.getRepository(inst.type)
            await inst.action(rep)
    
        }
    }

    Log.ln()
    Log.ok("Proceso finalizado!")
    await orm.close()
}