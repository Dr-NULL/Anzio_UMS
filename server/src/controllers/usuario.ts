import { EndPoint } from "../tool/endpoint";
import { Usuario } from "../models/usuario";

export const usuarioGetAll = new EndPoint()
usuarioGetAll.method = "get"
usuarioGetAll.path = "/"
usuarioGetAll.callback = async (req, res) => {
    const data = await Usuario.find()

    res.send(data)
}