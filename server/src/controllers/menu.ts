import { StatusCodes } from "../tool/api";
import { EndPoint } from "../tool/endpoint";
import { Sistema } from "../models/sistema";
import { Usuario } from "../models/usuario";
import { RelUsuarioMenu } from "../models/rel-usuario-menu";
import { Menu } from "../models/menu";
import { Like } from "typeorm";
import { orm } from "../server/.";

export const getByDomain = new EndPoint()
getByDomain.method = "get"
getByDomain.path = "/menu/domain/:db_name"
getByDomain.callback = async (req, res) => {
    try {
        if (req.session.isCreated) {
            //Constantes de entorno
            const user = await Usuario.findOne({
                id: req.session.data.id
            })
            const sist = await Sistema.findOne({
                where: { db: Like(req.params.db_name) }
            })
            const rela = await RelUsuarioMenu.find({
                usuario: user
            })

            //Cargar árbol
            const tree = orm.getTreeRepository(Menu)
            const root = await tree.findRoots()
            const init: Menu[] = []

            //comprobar si existe el menú en la relación
            function exist(obj: Menu) {
                return rela.find(y => (y.menu.id == obj.id) && (obj.sistemaId == sist.id)) != null
            }
            
            //Cargar rutas principales
            for (let x of root) {
                if (exist(x) || user.isSystem) {
                    //Cargar descendencia
                    init.push(await tree.findDescendantsTree(x))
                }
            }

            //Asesinar de forma recursiva
            function recursive(obj: Menu[]) {
                let i = 0
                while (i < obj.length) {
                    //Recursive patterns :^)
                    if (obj[i].children.length > 0) {
                        recursive(obj[i].children)
                    }

                    //Eliminar objeto
                    if (!exist(obj[i])) {
                        obj.splice(i, 1)
                    } else {
                        i++
                    }
                }
            }
            
            if (!user.isSystem) {
                recursive(init)
            }

            res.api.send(init)
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