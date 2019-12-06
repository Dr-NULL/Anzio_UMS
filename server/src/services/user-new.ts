import { randomBytes } from "crypto";
import { Service } from ">/tool/service";
import { Log } from ">/tool/log";
import { orm } from ">/.";

import { Usuario } from ">/models/Usuario";
import { Cargo } from ">/models/cargo";

export const userNew = new Service()
userNew.method = "post"
userNew.path = "/user/new"
userNew.callback = async (req, res) => {
    const body: {
        idCargo: number;
        nick: string;
        email: string;
        firstName: string;
        lastNameP: string;
        lastNameM: string;
    } = req.body

    const user = new Usuario()
    user.nick = body.nick
    user.firstName = body.firstName
    user.lastNameP = body.lastNameP
    user.lastNameM = body.lastNameM
        
    //Buscar Cargo
    const cargoRep = orm.getRepository(Cargo)
    const cargo = await cargoRep.findOne({ id: body.idCargo })

    if (cargo == null) {
        Log.er("El cargo ingresado no existe!")
        Log.ln("No se ha creado el usuario...\n")
        res.send({ isCreated: false })

    } else {
        //Crear nuevo usuario
        const user = new Usuario()
        user.cargo = cargo
        user.nick = body.nick
        user.firstName = body.firstName
        user.lastNameP = body.lastNameP
        user.lastNameM = body.lastNameM
        user.token = ""

        //Nuevo token
        let rnd = randomBytes(32)
        rnd.forEach(byte => {
            let str = String(byte)
            while (str.length < 3) { str = "0" + str }
            user.token += str
        })

        //Guardar en DB
        await orm.manager.save(user)
        Log.ok("Usuario Insertado!")
        Log.ln(`nick -> ${body.nick}`)
        Log.ln(`mail -> ${body.email}\n`)
        res.send({ isCreated: true })
    }
}