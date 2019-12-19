import { EndPoint } from "../tool/endpoint";
import { Sistema } from "../models/sistema";

export const getAll = new EndPoint()
getAll.method = "get"
getAll.path = "/sistema/get"
getAll.callback = async (req, res) => {
    try {
        const data = await Sistema.find();
        res.api.send(data)
    } catch (err) {
        res.api.catch(err)
    }
}

export const add = new EndPoint()
add.method = "form-data"
add.path = "/sistema/add"
add.fileReceive = [{ name: "file" }]
add.callback = (req, res) => {
    console.log(req.body)

    res.send()
}