import { Seed } from "../tool/orm";

import { Area } from "../models/area";
import { Cargo } from "../models/cargo";
import { Genero } from "../models/genero";
import { Usuario } from "../models/usuario";
import { intRRHH } from "../models/int-rrhh";
import { RelAreaCargo } from "../models/rel-area-cargo";

export const seedUsuario = new Seed(Usuario)
seedUsuario.action = async (rep) => {
    const rawUsers = await intRRHH.find()
    for (let raw of rawUsers) {
        //Obtener parámetros
        const gene = await Genero.findOne({
            cod: raw.genero
        })

        const area = await Area.findOne({
            descripc: raw.area
        })

        const cargo = await Cargo.findOne({
            descripc: raw.cargo
        })

        const relac = await RelAreaCargo.findOne({
            area: area,
            cargo: cargo
        })

        //crear usuario
        const user = new Usuario()
        user.rut = raw.rut
        user.nombres = raw.nombres
        user.apellidoP = raw.apellido1
        user.apellidoM = raw.apellido2
        user.fechaNacim = raw.fechaNacim
        user.genero = gene
        user.relAreaCargo = relac

        await Usuario.save(user)
    }
}