import { Not } from "typeorm";
import { EndPoint } from "../tool/endpoint";
import { Usuario } from "../models/usuario";
import { Cargo } from "../models/cargo";
import { Area } from "../models/area";

interface iUsuario extends Usuario {
    area?: Area;
    cargo?: Cargo;
}

export const getAll = new EndPoint()
getAll.method = "get"
getAll.path = "/daemon/usuario/get"
getAll.callback = async (req, res) => {
    try {
        const data: iUsuario[] = await Usuario.find({
            where: {
                id: Not(1)
            }
        })
    
        for (let x of data) {
            //Cargar Relaciones
            x.area = x.relAreaCargo.area
            x.cargo = x.relAreaCargo.cargo
            
            //Remover campos
            delete x.pass
            delete x.relAreaCargo
        }
    
        //Testear Error
        res.api.success(data)
    } catch (err) {
        res.api.failed({
            status: "500",
            detail: err
        })
    }
}

export const getById = new EndPoint()
getById.method = "get"
getById.path = "/daemon/usuario/get/:id"
getById.callback = async (req, res) => {
    try {
        const data: iUsuario[] = await Usuario.find({
            where: {
                id: req.params.id
            }
        })
    
        for (let x of data) {
            //Cargar Relaciones
            x.area = x.relAreaCargo.area
            x.cargo = x.relAreaCargo.cargo
            
            //Remover campos
            delete x.pass
            delete x.relAreaCargo
        }
    
        //Testear Error
        res.api.success(data)
    } catch (err) {
        res.api.failed({
            status: "500",
            detail: err
        })
    }
}

export const setSystem = new EndPoint()
setSystem.method = "post"
setSystem.path = "/daemon/usuario/system/set"
setSystem.callback = (req, res) => {
    const body: Usuario = req.body
    
}