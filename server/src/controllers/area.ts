import { EndPoint } from "../tool/endpoint";
import { Area } from "../models/area";

export const getAll = new EndPoint()
getAll.method = "get"
getAll.path = "/daemon/area/get"
getAll.callback = async (req, res) => {
    try {
        const data = await Area.find()
        res.api.success(data)
    } catch(err) {
        res.api.failed({
            status: "500",
            detail: err
        })
    }
}

export const getById = new EndPoint()
getById.method = "get"
getById.path = "/daemon/area/get/:id"
getById.callback = async (req, res) => {
    try {
        const data = await Area.find({
            where: { id: req.params.id }
        })
        res.api.success(data)
    } catch(err) {
        res.api.failed({
            status: "500",
            detail: err
        })
    }
}