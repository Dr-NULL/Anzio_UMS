import { Seed } from "../tool/orm";
import { intRRHH } from "../models/int-rrhh";
import { Usuario } from "../models/usuario";
import { Genero } from "../models/genero";
import { Area } from "../models/area";
import { Cargo } from "../models/cargo";

export const seedUsuario = new Seed(Usuario)
seedUsuario.action = async (cls, rep) => {
    let raw = await intRRHH.find()
    for (let item of raw) {
        let inst = new Usuario()
        inst.rut = item.rut
        inst.nombres = item.nombres
        inst.apellidoP = item.apellido1
        inst.apellidoM = item.apellido2
        inst.genero = await Genero.createQueryBuilder()
            .select()
            .distinct(true)
            .where({ cod: item.genero })
            .execute()
            
        inst.area = await Area.createQueryBuilder()
            .select()
            .distinct(true)
            .where({ descripc: item.area })
            .execute()

        inst.cargo = await Cargo.createQueryBuilder()
            .select()
            .distinct(true)
            .where({ descripc: item.cargo })
            .execute()

        Usuario.save(inst)
    }
}