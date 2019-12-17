import { Usuario } from "../models/usuario";
import { EndPoint } from "../tool/endpoint";
import { Corrupted } from "../tool/corrupted";
import { randomBytes } from "crypto";
import { StatusCodes } from "../tool/api";

export const getAll = new EndPoint()
getAll.method = "get"
getAll.path = "/usuario/get"
getAll.callback = async (req, res) => {
    try {
        const data: Usuario[] = await Usuario.find({
            where: {
                isSystem: false
            }
        })
    
        //Testear Error
        res.api.send(data.map(x => {
            delete x.pass
            delete x.token
        }))
    } catch (err) {
        res.api.catch(err)
    }
}

export const getById = new EndPoint()
getById.method = "get"
getById.path = "/usuario/get/:id"
getById.callback = async (req, res) => {
    try {
        const data: Usuario = await Usuario.findOne({
            where: {
                id: req.params.id
            }
        })

        if ((data.isSystem) && (data.isActive)) {
            res.api.failed({
                HttpResponse: StatusCodes.cod401,
                details: "Solo el usuario System tiene acceso a sus propios datos."
            })
        } else {
            res.api.send(data)
        }
    } catch (err) {
        res.api.catch(err)
    }
}

export const getActive = new EndPoint()
getActive.method = "get"
getActive.path = "/usuario/get-active"
getActive.callback = async (req, res) => {
    try {
        const data = await Usuario.find({
            where: {
                isActive: true
            }
        })

        res.api.send(data)
    } catch (err) {
        res.api.catch(err)
    }
}

export const gotoSetup = new EndPoint()
gotoSetup.method = "get"
gotoSetup.path = "/usuario/goto-setup"
gotoSetup.callback = async (req, res) => {
    try {
        const cant = await Usuario.count({
            isSystem: true,
            isActive: true
        })

        if (cant > 0) {
            res.api.send(false)
        } else {
            res.api.send(true)
        }
    } catch (err) {
        res.api.catch(err)
    }
}

export const setSystemPass = new EndPoint()
setSystemPass.method = "get"
setSystemPass.path = "/usuario/system/gen-pass"
setSystemPass.callback = async (req, res) => {
    try {
        // Aceptar Petición
        async function success() {
            // Crear nueva contraseña
            let out = ""
            const bytes = randomBytes(20).toJSON().data
            const ref = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789.-_"
            for (let i in bytes) {
                out += ref[Math.floor((bytes[i] * 66) / 255)]
            }

            // Reemplazar la aterior contraseña por una nueva
            const encr = new Corrupted()
            const users = await Usuario.find({
                isSystem: true
            })
            for (let user of users) {
                user.pass = encr.encode(out)
                user.isActive = true
                user.save()
            }
    
            res.api.send(out)
        }

        // Rechazar Petición
        function reject() {
            res.api.failed({
                HttpResponse: StatusCodes.cod401,
                details: "Solo está permitido a usuarios del tipo \"System\" generar una nueva contraseña para su cuenta."
            })
        }

        // Validar Petición
        if (!req.session.isCreated) {    
            const cant = await Usuario.count({
                where: {
                    isSystem: true,
                    isActive: true
                }
            })

            if (cant == 0) {
                await success()
            } else {
                reject()
            }
        } else {
            const session: Usuario = req.session.data
            const user = await Usuario.findOne({
                id: session.id,
                isSystem: true
            })

            if (user != null) {
                await success()
            } else {
                reject()
            }
        }
    } catch (err) {
        res.api.catch(err)
    }
}

export const login = new EndPoint()
login.method = "post"
login.path = "/usuario/login"
login.callback = async (req, res) => {
    // Get Data
    const body: {
        nick: string;
        pass: string;
    } = req.body
    
    const encr = new Corrupted()
    const pass = encr.encode(body.pass)

    try {
        //Search in the database
        const user = await Usuario.findOne({
            nick: body.nick,
            pass: pass
        })
    
        if (user != null) {
            delete user.pass
            delete user.token
    
            // Create a new session
            req.session.new()
            req.session.data = user
            res.api.send(user)
        } else {
            res.api.failed({
                HttpResponse: StatusCodes.cod401,
                details: "Credenciales de acceso incorrectas, reintente..."
            })
        }
    } catch (err) {
        res.api.catch(err)
    }
}