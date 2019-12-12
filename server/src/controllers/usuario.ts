import { EndPoint } from "../tool/endpoint";
import { Usuario } from "../models/usuario";
import { Cargo } from "../models/cargo";
import { Area } from "../models/area";

interface iUsuario extends Usuario {
    area?: Area;
    cargo?: Cargo;
}

export const usuarioGetAll = new EndPoint()
usuarioGetAll.method = "get"
usuarioGetAll.path = "/daemon/usuario/get"
usuarioGetAll.callback = async (req, res) => {
    const data: iUsuario[] = await Usuario.find()

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
}

export const usuarioSetSystem = new EndPoint()
usuarioSetSystem.method = "post"
usuarioSetSystem.path = "/daemon/usuario/system/set"
usuarioSetSystem.callback = (req, res) => {
    const body: Usuario = req.body
    
}