import { EndPoint } from "../tool/endpoint";
import { Usuario } from "../models/usuario";

export const usuarioGetAll = new EndPoint()
usuarioGetAll.method = "get"
usuarioGetAll.path = "/"
usuarioGetAll.callback = async (req, res) => {
    const data = await Usuario.find()

    //Remover campos
    data.forEach(x => {
        delete x.nick
        delete x.pass
        delete x.token
        delete x.isActive
    })

    //Testear Error
    res.api.success(data)
}