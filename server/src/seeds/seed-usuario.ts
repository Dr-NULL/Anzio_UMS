import { Seed } from "../tool/orm";

import { Area } from "../models/area";
import { Cargo } from "../models/cargo";
import { Sexo } from "../models/sexo";
import { Usuario } from "../models/usuario";
import Log from "../tool/log";

export const seedUsuario = new Seed(Usuario)
seedUsuario.action = async () => {
    try {
        //Obtener paramétricas
        const area = await Area.findOne({ id: 1 })
        const cargo = await Cargo.findOne({ id: 1 })
        const sexo = await Sexo.findOne({ id: 1 })
    
        //Crear MasterMind
        const user = new Usuario()
        user.rut = "1-9"
        user.nick = "hitler"
        user.nombres = "Adolf"
        user.apellidoP = "Hitler"
        user.apellidoM = ""
        user.fechaNacim = new Date(666, 5, 6)
        user.fechaInserc = new Date(666, 5, 6)
        user.fechaActivac = new Date(666, 5, 6)
        user.isActive = false
        user.sexo = sexo
        user.area = area
        user.cargo = cargo
        await user.save()

    } catch (fail) {
        Log.er("Fallo al crear Usuario")
    }
}