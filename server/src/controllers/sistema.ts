import { EndPoint } from "../tool/endpoint";
import { Sistema } from "../models/sistema";
import { decode, encode } from "base64-arraybuffer";

export const getAll = new EndPoint()
getAll.method = "get"
getAll.path = "/sistema/get"
getAll.callback = async (req, res) => {
    try {
        const data = await Sistema.find();
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
        const data: Sistema = req.body
        const base64 = req.body.img.split(",")
        const file = Buffer.from(base64[1], 'base64')

        const sys = new Sistema()
        sys.nombre = data.nombre
        sys.descripc = data.descripc
        sys.db = data.db
        sys.url = data.url
        sys.icon = sys.icon
        sys.imgType = base64[0]
        sys.imgData = file
        await sys.save()

        res.api.send()
    } catch (err) {
        console.log(err)
        res.api.catch(err)
    }
}