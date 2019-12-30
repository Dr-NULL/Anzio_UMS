import { Seed } from "../tool/orm";
import { Menu } from "../models/menu";
import { Sistema } from "../models/sistema";

export const seedMenu = new Seed(Menu)
seedMenu.action = async (orm) => {
    //Instanciar árbol
    const repo = orm.getTreeRepository(Menu)

    //Buscar sistema al cual vincular
    const sistema = await Sistema.findOne({
        db: "SYS_UMS"
    })

    //Contraseña Random
    const menuSetup = new Menu()
    menuSetup.url = "setup"
    menuSetup.nombre = "Gen Random Pass"
    menuSetup.descripc = "Establece una contraseña aleatoria nueva para el usuario System"
    menuSetup.icono = "fas fa-brain"
    menuSetup.sistema = sistema
    await repo.save(menuSetup)
    
    //Crear Raíz de Usuarios
    const menuUser = new Menu()
    menuUser.nombre = "Usuarios"
    menuUser.descripc = "Contiene mantenedores de usuarios."
    menuUser.icono = "fas fa-users-cog"
    menuUser.sistema = sistema
    await repo.save(menuUser)

    //ETL de Usuarios
    const menuUserEtl = new Menu()
    menuUserEtl.url = "usuarios/import"
    menuUserEtl.nombre = "Importar desde CSV"
    menuUserEtl.descripc = "Realiza una migración de datos desde un archivo CSV."
    menuUserEtl.icono = "fas fa-file-import"
    menuUserEtl.sistema = sistema
    menuUserEtl.parent = menuUser
    await repo.save(menuUserEtl)
    
    //Crear Raíz de mantenedor de sistemas
    const menuSist = new Menu()
    menuSist.nombre = "Sistema"
    menuSist.descripc = "Contiene mantenedores de los sistemas ya implementados."
    menuSist.icono = "fas fa-terminal"
    menuSist.sistema = sistema
    await repo.save(menuSist)

    //Agregar Sistema
    const menuSistAdd = new Menu()
    menuSistAdd.url = "sistema/add"
    menuSistAdd.nombre = "Agregar"
    menuSistAdd.descripc = "Crea nuevos proyectos para ser insertados en el sistema."
    menuSistAdd.icono = "fas fa-plus"
    menuSistAdd.sistema = sistema
    menuSistAdd.parent = menuSist
    await repo.save(menuSistAdd)

    //Modificar Sistema
    const menuSistAlt = new Menu()
    menuSistAlt.url = "sistema/alt"
    menuSistAlt.nombre = "Editar"
    menuSistAlt.descripc = "Edita los proyectos ya implementados."
    menuSistAlt.icono = "fas fa-edit"
    menuSistAlt.sistema = sistema
    menuSistAlt.parent = menuSist
    await repo.save(menuSistAlt)
}