import { EndPoint } from "../tool/endpoint";
import { Cargo } from "../models/cargo";
import { StatusCodes } from "../tool/api";

export const getAll = new EndPoint()
getAll.method = "get"
getAll.path = "/cargo/get"
getAll.callback = async (req, res) => {
    try {
        const data = await Cargo.find()
        res.api.send(data)
    } catch(err) {
        res.api.failed({
            HttpResponse: StatusCodes.cod500,
            details: err.message
        })
    }
}

export const getById = new EndPoint()
getById.method = "get"
getById.path = "/cargo/get/:id"
getById.callback = async (req, res) => {
    try {
        const data = await Cargo.find({
            where: { id: req.params.id }
        })

        res.api.send(data)
    } catch(err) {
        res.api.failed({
            HttpResponse: StatusCodes.cod500,
            details: err.message
        })
    }
}