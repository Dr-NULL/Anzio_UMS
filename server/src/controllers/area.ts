import { EndPoint } from "../tool/endpoint";
import { Area } from "../models/area";

export const getAll = new EndPoint()
getAll.method = "get"
getAll.path = "/area/get"
getAll.callback = async (req, res) => {
    try {
        const data = await Area.find()
        res.api.send(data)
    } catch(err) {
        res.api.catch(err)
    }
}

export const getById = new EndPoint()
getById.method = "get"
getById.path = "/area/get/:id"
getById.callback = async (req, res) => {
    try {
        const data = await Area.find({
            where: { id: req.params.id }
        })
        res.api.send(data)
    } catch(err) {
        res.api.catch(err)
    }
}