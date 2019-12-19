import { RelUsuarioMenu } from "../models/rel-usuario-menu";
import { Usuario } from "../models/usuario";
import { Menu } from "../models/menu";
import { Seed } from "../tool/orm";
import { Not } from "typeorm";

export const seedRelUsuarioMenu = new Seed(RelUsuarioMenu)
seedRelUsuarioMenu.action = async () => {
    const menu = await Menu.find({ id: Not(2) })
    const user = await Usuario.findOne({
        isSystem: true
    })

    for (let item of menu) {
        let rel = new RelUsuarioMenu()
        rel.usuario = user
        rel.menu = item
        await rel.save()
    }
}