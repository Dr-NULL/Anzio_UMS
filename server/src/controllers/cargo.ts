import { EndPoint } from "../tool/endpoint";
import { Cargo } from "../models/cargo";

export const getAll = new EndPoint()
getAll.method = "get"
getAll.path = "/cargo/get"
getAll.callback = async (req, res) => {
    try {
        const data = await Cargo.find()
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
getById.path = "/cargo/get/:id"
getById.callback = async (req, res) => {
    try {
        const data = await Cargo.find({
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