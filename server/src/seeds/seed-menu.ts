import { Seed } from "../tool/orm";
import { Menu } from "../models/menu";
import { Sistema } from "../models/sistema";

export const seedMenu = new Seed(Menu)
seedMenu.action = async () => {
    //Buscar sistema al cual vincular
    const sistema = await Sistema.findOne({
        db: "SYS_UMS"
    })

    //Agregar Sistema
    const menuSistAdd = new Menu()
    menuSistAdd.url = "sistema/add"
    menuSistAdd.nombre = "Agregar"
    menuSistAdd.descripc = "Crea nuevos proyectos para ser insertados en el sistema."
    menuSistAdd.icono = "fas fa-plus"
    menuSistAdd.sistema = sistema
    await menuSistAdd.save()

    //Modificar Sistema
    const menuSistAlt = new Menu()
    menuSistAlt.url = "sistema/alt"
    menuSistAlt.nombre = "Modificar/Eliminar"
    menuSistAlt.descripc = "Edita o elimina las referencias a proyectos ya implementados."
    menuSistAlt.icono = "fas fa-edit"
    menuSistAlt.sistema = sistema
    await menuSistAlt.save()
    
    //Crear Raíz de mantenedor de sistemas
    const menuSist = new Menu()
    menuSist.nombre = "Sistema"
    menuSist.descripc = "Contiene mantenedores de los sistemas ya implementados."
    menuSist.icono = "fas fa-terminal"
    menuSistAdd.sistema = sistema
    menuSistAdd.children = [
        menuSistAdd,
        menuSistAlt
    ]
    await menuSist.save()
}