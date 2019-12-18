import { StatusCodes } from "../tool/api";
import { EndPoint } from "../tool/endpoint";
import { Sistema } from "../models/sistema";
import { Menu } from "../models/menu";
import { Like } from "typeorm";
import { orm } from "../server/.";

export const getByDomain = new EndPoint()
getByDomain.method = "get"
getByDomain.path = "/menu/domain"
getByDomain.callback = async (req, res) => {
    try {
        if (req.session.isCreated) {    
            const project = await Sistema.findOne({
                where: { url: Like(req.headers.origin) }
            })
        
            const tree = orm.getTreeRepository(Menu)
            const root = await Menu.find({
                where: {
                    sistema: project
                }
            })
        
            const data: Menu[] = []
            for (let item of root) {
                data.push(await tree.findDescendantsTree(item))
            }
            
            res.api.send(data)
        } else {
            res.api.failed({
                HttpResponse: StatusCodes.cod401,
                details: "Debes iniciar sesión para acceder a los menús."
            })
        }
    } catch (err) {
        res.api.catch(err)
    }
}