import { Seed } from "../tool/orm";

import { Area } from "../models/area";
import { Cargo } from "../models/cargo";
import { Sexo } from "../models/sexo";
import { Usuario } from "../models/usuario";
import { RelAreaCargo } from "../models/rel-area-cargo";
import Log from "../tool/log";

export const seedUsuario = new Seed(Usuario)
seedUsuario.action = async () => {
    try {
        //Obtener paramétricas
        const area = await Area.findOne({ id: 1 })
        const cargo = await Cargo.findOne({ id: 1 })
        const sexo = await Sexo.findOne({ id: 1 })
    
        //Crear relación
        const relac = new RelAreaCargo()
        relac.area = area
        relac.cargo = cargo
        await relac.save()
    
        //Crear MasterMind
        const user = new Usuario()
        user.rut = "1-9"
        user.nick = "hitler"
        user.nombres = "Adolf"
        user.apellidoP = "Hitler"
        user.apellidoM = ""
        user.fechaNacim = new Date(666, 5, 6)
        user.isActive = false
        user.genero = sexo
        user.relAreaCargo = relac
        await user.save()

    } catch (fail) {
        Log.er("Fallo al crear Usuario")
    }
}