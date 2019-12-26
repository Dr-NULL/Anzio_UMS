import { EndPoint } from "../tool/endpoint";
import { Sistema } from "../models/sistema";
import { Usuario } from "../models/usuario";
import { StatusCodes } from "../tool/api";
import { isAdmin } from "../tool/check-session";

export const getAll = new EndPoint()
getAll.method = "get"
getAll.path = "/sistema/get/:isActive?/:id?"
getAll.callback = async (req, res) => {
    try {
        let query: any = {}

        // Filtro por estado
        if (req.params.isActive == "true" || req.params.isActive == null) {
            query.isActive = true
        } else if (req.params.isActive == "false") {
            query.isActive = false
        } else if (req.params.isActive != "all") {
            res.api.failed({
                HttpResponse: StatusCodes.cod400,
                details: 'Formato incorrecto para el Parámetro "isActive", solo puede ser "true" (vacío igual cuenta como true), "false" o "all".'
            })

            return
        }

        // Filtro por ID
        if (req.params.id != undefined) {
            let id = parseInt(req.params.id)
            if (!isNaN(id)) {
                query.id = id
            } else {
                res.api.failed({
                    HttpResponse: StatusCodes.cod400,
                    details: 'Formato incorrecto para el Parámetro "id", solo acepta vacío (todos) o un valor numérico.'
                })

                return
            }
        }

        // Autentificar
        if (query.isActive != true) {
            if (!await isAdmin(req, res, {
                isNotLogged: "Necesita de Autentificar para consultar por todos los sistemas.",
                isUnauthorized: "No tiene los permisos suficientes para consultar por todos los productos."
            })) {
                return
            }
        }

        const data: Sistema[] = await Sistema.find({ where: query })
        let arrData: any[] = []

        for (let x of data) {
            let img: string
            if (x.imgData != null) {
                img = x.imgType + ","
                img += x.imgData.toString('base64')
            }

            arrData.push({
                id: x.id,
                isActive: x.isActive,
                nombre: x.nombre,
                descripc: x.descripc,
                db: x.db,
                url: x.url,
                icon: x.icon,
                img: img
            })
        }

        res.api.send(arrData)
    } catch (err) {
        res.api.catch(err)
    }
}

export const add = new EndPoint()
add.method = "post"
add.path = "/sistema/add"
add.callback = async (req, res) => {
    try {
        if (req.session.isCreated) {
            // Get User
            const user = await Usuario.findOne({
                id: req.session.data.id
            })

            // Validar permisos
            if ((!user.isSystem) && (!user.isAdmin)) {
                res.api.failed({
                    HttpResponse: StatusCodes.cod403,
                    details: "Usted no posee los permisos suficientes para agregar sistemas."
                })

            } else {
                const data: Sistema = req.body
                const base64 = req.body.img.split(",")
                const file = Buffer.from(base64[1], 'base64')
        
                if (data.url.match(/^https?:\/\//gi) == null) {
                    data.url = "http://" + data.url
                }
        
                const sys = new Sistema()
                sys.nombre = data.nombre
                sys.descripc = data.descripc
                sys.db = data.db
                sys.url = data.url
                sys.icon = data.icon
                sys.imgType = base64[0]
                sys.imgData = file
                await sys.save()
        
                res.api.send()
            }
        } else {
            res.api.failed({
                HttpResponse: StatusCodes.cod401,
                details: "Credenciales de acceso incorrectas, reintente..."
            })
        }
    } catch (err) {
        console.log(err)
        res.api.catch(err)
    }
}

export const toggle = new EndPoint()
toggle.method = "get"
toggle.path = "/sistema/toggle/:id"
toggle.callback = async (req, res) => {
    try {
        if (req.session.isCreated) {
            // Get User
            const user = await Usuario.findOne({
                id: req.session.data.id
            })

            // Validar permisos
            if (!await isAdmin(req, res, {
                isNotLogged: "Necesita de Autentificar para cambiar el estado del sistema.",
                isUnauthorized: "No tiene los permisos suficientes para cambiar el estado del sistema."
            })) {
                return
            } else {
                // Cambiar Estado
                const sist = await Sistema.findOne({ id: parseInt(req.params.id) })

                if (sist.db == "SYS_UMS") {
                    res.api.failed({
                        HttpResponse: StatusCodes.cod403,
                        details: "No se puede desactivar el sistema de UMS, acceso denegado."
                    })
                } else {
                    sist.isActive = !sist.isActive
                    await sist.save()
                    res.api.send()
                }
            }
        } else {
            res.api.failed({
                HttpResponse: StatusCodes.cod401,
                details: "Necesita de Autentificarse para cambiar el estado de un sistema."
            })
        }
    } catch (err) {
        console.log(err)
        res.api.catch(err)
    }
}

export const edit = new EndPoint()
edit.method = "post"
edit.path = "/sistema/edit"
edit.callback = async (req, res) => {
    try {
        // Checar Privilegios
        if (!await isAdmin(req, res, {
            isNotLogged: "Necesita autentificarse para modificar un sistema.",
            isUnauthorized: "No posee los permisos necesarios para modificar un sistema."
        })) {
            return
        }
    
        // Get the current system
        const sist = await Sistema.findOne({
            id: parseInt(req.body.id)
        })
    
        if (sist == null) {
            res.api.failed({
                HttpResponse: StatusCodes.cod404,
                details: "El sistema que se desea editar no existe, por favor ingrese un id válido."
            })
        } else {
            // Comprobar cambio de base de datos
            if (sist.db == "SYS_UMS" &&  sist.db != req.body.db) {
                res.api.failed({
                    HttpResponse: StatusCodes.cod400,
                    details: "Sabes muy bien que cambiar la base de datos del UMS es tremenda pendejada... >:^)"
                })

                return
            }

            sist.db = req.body.db
            sist.nombre = req.body.nombre
            sist.descripc = req.body.descripc
            sist.icon = req.body.icon
    
            if (req.body.url.match(/^https?:\/\//gi) == null) {
                sist.url = "http://" + req.body.url
            } else {
                sist.url = req.body.url
            }
    
            if (req.body.img != null) {
                const base64 = req.body.img.split(",")
                const file = Buffer.from(base64[1], 'base64')
    
                sist.imgType = base64[0]
                sist.imgData = file
            }
    
            await sist.save()
            res.api.send()
        }
    } catch (err) {
        console.log(err)
        res.api.catch(err)
    }
}