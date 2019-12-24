import { EndPoint } from "../tool/endpoint";
import { Sistema } from "../models/sistema";
import { Usuario } from "../models/usuario";
import { StatusCodes } from "../tool/api";

export const getAll = new EndPoint()
getAll.method = "get"
getAll.path = "/sistema/get"
getAll.callback = async (req, res) => {
    try {
        const data = await Sistema.find({ isActive: true });
        let arrData: any[] = []

        for (let x of data) {
            let img: string
            if (x.imgData != null) {
                img = x.imgType + ","
                img += x.imgData.toString('base64')
            }

            arrData.push({
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

export const kill = new EndPoint()
kill.method = "get"
kill.path = "/sistema/kill/:id"
kill.callback = async (req, res) => {
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
                const sist = await Sistema.findOne({
                    id: parseInt(req.params.id)
                })

                if (sist == null) {
                    // El sistema no existe
                    res.api.failed({
                        HttpResponse: StatusCodes.cod404,
                        details: "El sistema especificado no existe."
                    })
                } else {
                    // Eliminar el sistema
                    await sist.remove()
                    res.api.send()
                }
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