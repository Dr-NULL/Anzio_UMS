import { Excel } from "../tool/xlsx";
import moment from "moment";

import { EndPoint } from "../tool/endpoint";
import { isAdmin } from "../tool/check-session";
import { StatusCodes } from "../tool/api";
import { Usuario } from "../models/usuario";
import { UsuarioInt } from "../models/usuario-int";
import { Not, In, Like } from "typeorm";
import { Sexo } from "../models/sexo";
import { Area } from "../models/area";
import { Cargo } from "../models/cargo";

export const importFile = new EndPoint()
importFile.method = "post"
importFile.path = "/usuario/etl/import"
importFile.callback = async (req, res) => {
    try {
        // // Detectar Sesión Válida
        // if (!isAdmin(req, res, {
        //     isNotLogged: "Necesita Autentificarse para importar usuarios al sistema.",
        //     isUnauthorized: "No posee los privilegios suficientes para importar usuarios al sistema."
        // })) {
        //     return
        // }

        // Importar Archivo
        const base64 = req.body.file.split(/,/gi)
        const raw = Buffer.from(base64[1], 'base64')

        // Leer Archivo
        switch(req.body.ext.toLowerCase().trim()) {
            case "xls":
            case "xlsx":
                await readXLS(raw)
                break

            case "csv":
                await readCSV(raw)
                break

            default:
                res.api.failed({
                    HttpResponse: StatusCodes.cod400,
                    details: `La extensión del archivo "${req.body.ext}" no es válida, reintente...`
                })
                return
        }

        // Rut del personal a importar
        const arrRutSource: {
            rut: string
        }[] = await UsuarioInt
            .createQueryBuilder()
            .select("rut")
            .distinct()
            .execute()

        // Rut del personal ya registrado
        const arrRutDest: Usuario[] = await Usuario
            .createQueryBuilder()
            .select("*")
            .distinct()
            .where("fechaElimin is null")
            .execute()

        // Usuarios que se agregarán
        const vinc = await UsuarioInt.find({
            where: {
                rut: Not(In(arrRutDest.map(x => x.rut)))
            }
        })

        // Usuarios que se desvincularán
        const desv = await Usuario.find({
            where: {
                rut: Not(In(arrRutSource.map(x => x.rut))),
                isSystem: false
            }
        })

        // Usuarios que se revisarán
        const coincDb = await Usuario.find({ isSystem: false })
        const coincEx = await UsuarioInt.find({
            where: {
                rut: In(arrRutDest.map(x => x.rut))
            }
        })

        let edit: UsuarioInt[] = [] 
        for (let item of coincEx) {
            if (
                (coincDb.find(x => x.nombres == item.nombres) == null) ||
                (coincDb.find(x => x.apellidoP == item.apellidoP) == null) ||
                (coincDb.find(x => x.apellidoM == item.apellidoM) == null) ||
                (coincDb.find(x => x.sexo.cod == item.sexo) == null) ||
                (coincDb.find(x => x.area.descripc == item.area) == null) ||
                (coincDb.find(x => x.cargo.descripc == item.cargo) == null) ||
                (coincDb.find(x => x.email == item.email) == null)
            ) {
                edit.push(item)
            }
        }

        res.api.send({
            vinc,
            desv,
            edit
        })
    } catch (err) {
        res.api.catch(err)
    }
}

async function readCSV(raw: Buffer) {
    try {
        console.clear();
        console.log("Esto es un CSV")
    
        // Leer Buffer
        let txt = raw.toString('utf8')              // Transformar a String
        txt = txt.replace(/^\s*(;\s*)+$/gim, "")    // Remover líneas vacías
        txt = txt.replace(/(^\n+|\n+$)/gi, "")      // Remover saltos de línea iniciales/finales
        txt = txt.replace(/\n+/gi, "<$end>")        // Reemplazar salto línea
        txt = txt.replace(/\s+/gi, " ")
    
        // Generar líneas
        let arr = txt.split(/<\$end>/gi)
        arr.shift()
        arr = arr.map(x => x.trim())
        
        // Recorrer líneas
        await UsuarioInt.clear()
        for (let line of arr) {
            let cell = line.split(/;/gi)
    
            const item = new UsuarioInt()
            item.rut = cell[0]
    
            const name = cell[1].split(/,/gi)
            const last = name[0].split(/\s+/gi)
            while (last.length < 2) { last.push("") }
    
            item.nombres = name[1].trim()
            item.apellidoP = last[0].trim()
            item.apellidoM = last[1].trim()
    
            item.area = cell[2]
            item.cargo = cell[3]
            item.sexo = cell[4]
            item.fechaNacim = moment(cell[5], "DD-MM-YYYY").toDate()
            item.rutJefe = cell[6]
            item.email = cell[7]
    
            await item.save()
        }
    } catch (err) {
        throw err
    }
}

async function readXLS(raw: Buffer) {
    try {
        console.clear();
        console.log("Esto es un XLS")
        const excel = new Excel(raw)
        const table = excel.table[0]

        await UsuarioInt.clear()
        for (let i = 1; i < table.data.length; i++) {
            if (table.data[i][0] == undefined) {
                continue
            }

            const item = new UsuarioInt()
            item.rut = (table.data[i][0].v as string).trim().toLowerCase()
            const name = (table.data[i][1].v as string).split(/,/gi)
            const last = name[0].split(/\s+/gi)
            while (last.length < 2) { last.push("") }
    
            item.nombres = caps(name[1].trim())
            item.apellidoP = caps(last[0].trim())
            item.apellidoM = caps(last[1].trim())
    
            item.area = caps(table.data[i][2].v as string)
            item.cargo = caps(table.data[i][3].v as string)
            item.sexo = caps(table.data[i][4].v as string)

            const dateNacim = table.data[i][5].w
            item.fechaNacim = moment(dateNacim, "MM/DD/YY").toDate()
            item.email = caps(table.data[i][8].v as string).trim().toLowerCase()
            if (table.data[i][7] != null) {
                item.rutJefe = (table.data[i][7].v as string).trim().toLowerCase()
            }
    
            await item.save()
        }
    } catch (err) {
        throw err
    }
}

export const etlExecute = new EndPoint()
etlExecute.method = "get"
etlExecute.path = "/usuario/etl/execute"
etlExecute.callback = async (req, res) => {
    await mapArea()
    await mapCargo()
    await mapSexo()
    await mapUsuarios()

    res.api.send()
}

async function mapArea() {
    const old: Array<{ descripc: string }> = await Area.createQueryBuilder()
        .select("descripc")
        .distinct()
        .execute()

    const add: Array<{ area: string }> = await UsuarioInt.createQueryBuilder()
        .select("area")
        .distinct()
        .where({ area: Not(In(old.map(x => x.descripc)))})
        .execute()

    // Agregar lo nuevo
    for (let item of add) {
        const area = new Area()
        area.descripc = item.area
        await area.save()
    }
}

async function mapCargo() {
    const old: Array<{ descripc: string }> = await Cargo.createQueryBuilder()
        .select("descripc")
        .distinct()
        .execute()

    const add: Array<{ cargo: string }> = await UsuarioInt.createQueryBuilder()
        .select("cargo")
        .distinct()
        .where({ cargo: Not(In(old.map(x => x.descripc)))})
        .execute()

    // Agregar lo nuevo
    for (let item of add) {
        const cargo = new Cargo()
        cargo.descripc = item.cargo
        await cargo.save()
    }
}

async function mapSexo() {
    const old: Array<{ cod: string }> = await Sexo.createQueryBuilder()
        .select("cod")
        .distinct()
        .execute()

    const add: Array<{ sexo: string }> = await UsuarioInt.createQueryBuilder()
        .select("sexo")
        .distinct()
        .where({ sexo: Not(In(old.map(x => x.cod)))})
        .execute()

    // Abortar si es que no hay nuevos items agregados
    if (add.length == 0) {
        return
    }

    // Borrar lo que ya no existe
    const system = await Usuario.findOne({ isSystem: true })
    await Sexo.delete({ 
        descripc: Not(In(add.map(x => x.sexo))),
        id: Not(system.sexo.id)
    })

    // Agregar lo nuevo
    for (let item of add) {
        const sexo = new Sexo()
        sexo.cod = item.sexo

        switch (sexo.cod.toLowerCase()) {
            case "m":
                sexo.descripc = "Masculino"
                break
            case "f":
                sexo.descripc = "Femenino"
                break
            default:
                sexo.descripc = "Otro"
                break
        }

        await sexo.save()
    }
}

async function mapUsuarios() {
    const ref: Array<UsuarioInt> = await UsuarioInt.createQueryBuilder()
        .select("*")
        .distinct()
        .execute()

    // Desvincular usuarios
    await Usuario.update({
        isSystem: false,
        rut: Not(In(ref.map(x => x.rut)))
    }, {
        isActive: false,
        fechaElimin: new Date(),
        fechaDesact: new Date()
    })

    // Actualizar Usuarios
    const users = await Usuario.find({ rut: In(ref.map(x => x.rut)) })
    for (let user of users) {
        const item = ref.find(x => x.rut == user.rut)
        const sexo = await Sexo.findOne({ cod: Like(item.sexo) })
        const area = await Area.findOne({ descripc: Like(item.area) })
        const cargo = await Cargo.findOne({ descripc: Like(item.cargo) })

        user.nombres = item.nombres
        user.apellidoP = item.apellidoP
        user.apellidoM = item.apellidoM
        user.fechaNacim = user.fechaNacim
        user.email = item.email
        user.sexo = sexo
        user.area = area
        user.cargo = cargo

        if (user.fechaElimin != null) {
            user.fechaInserc = new Date()
            user.fechaElimin = null
            user.fechaDesact = null
        }

        user.save()
    }

    // Agregar Nuevos Usuario
    const cur: Array<{ rut: string }> = await Usuario.createQueryBuilder()
        .select("rut")
        .distinct()
        .execute()

    const add = await UsuarioInt.find({ rut: Not(In(cur.map(x => x.rut))) })
    for (let item of add) {
        const sexo = await Sexo.findOne({ cod: item.sexo })
        const area = await Area.findOne({ descripc: item.area })
        const cargo = await Cargo.findOne({ descripc: item.cargo })

        const create = new Usuario()
        create.rut = item.rut
        create.nombres = item.nombres
        create.apellidoP = item.apellidoP
        create.apellidoM = item.apellidoM
        create.fechaInserc = new Date()
        create.fechaNacim = item.fechaNacim
        create.area = area
        create.cargo = cargo
        create.sexo = sexo
        create.email = item.email

        await create.save()
    }
}

function caps(input: string) {
    // Refactor
    input = input.trim()
    input = input.replace(/\s+/gi, " ")
    input = input.toLowerCase()

    // Capitalize
    let out = ""
    let words = input.split(/\s+/gi)
    for (let item of words) {
        let ch = item.substr(0, 1)
        ch = ch.toUpperCase()
        
        out += " " + item.replace(/^./gi, ch)
    }

    return out.trim()
}