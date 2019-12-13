import { Not } from "typeorm";
import { EndPoint } from "../tool/endpoint";
import { Usuario } from "../models/usuario";

export const getAll = new EndPoint()
getAll.method = "get"
getAll.path = "/usuario/get"
getAll.callback = async (req, res) => {
    try {
        const data: Usuario[] = await Usuario.find({
            where: {
                id: Not(1)
            }
        })
    
        //Testear Error
        res.api.success(data)
    } catch (err) {
        res.api.failed({
            status: "500",
            detail: err.message
        })
    }
}

export const getById = new EndPoint()
getById.method = "get"
getById.path = "/usuario/get/:id"
getById.callback = async (req, res) => {
    try {
        const data: Usuario[] = await Usuario.find({
            where: {
                id: req.params.id
            }
        })
    
        //Testear Error
        res.api.success(data)
    } catch (err) {
        res.api.failed({
            status: "500",
            detail: err.message
        })
    }
}

export const getActive = new EndPoint()
getActive.method = "get"
getActive.path = "/usuario/get-active"
getActive.callback = async (req, res) => {
    try {
        const data = await Usuario.find({ isActive: true })

        res.api.success(data)
    } catch (err) {
        res.api.failed({
            status: "500",
            detail: err.message
        })
    }
}