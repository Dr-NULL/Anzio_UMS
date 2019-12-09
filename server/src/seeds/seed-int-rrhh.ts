import moment from "moment";
import { Seed } from "../tool/orm";
import { File } from "../tool/file";
import { Path } from "../tool/config";

import { intRRHH } from "../models/int-rrhh";
import { Area } from "../models/area";
import { Cargo } from "../models/cargo";

export const seedIntRRHH = new Seed(intRRHH)
seedIntRRHH.data = []

//Read File
const rrhh = new File(Path.Data.Sources.rrhh)
const raw = (() => {
    let str = rrhh.readTextSync()
    str = str.toLowerCase()

    let flag = true
    let out = ""
    str.split("").forEach((ch, i) => {
        if (ch.match(/(\.|,|;|\s)/gi) != null) {
            flag = true
        } else if (flag == true) {
            ch = ch.toUpperCase()
            flag = false
        }

        out += ch
    })

    return out.split(/\n/gi)
})()

raw.forEach((line, i) => {
    let row = line.trim().split(/;/gi)
    row = row.map(x => x.trim())

    //Skipear líneas inútiles
    if (i == 0) {
        return
    } else if (row.length < 7) {
        return
    } else if (row[0].length == 0) {
        return
    }

    const userName = row[1].replace(/\s+/, " ").split(/,/gi)
    const userLast = userName[0].split(/\s+/gi)

    const fechaNacim = (() => {
        const me = moment(row[5], "DD-MM-YYYY")
        return me.toDate()
    })()
    
    if (row[6] != "") {
        let boss = row[6].split(/\s+/)
        const bossLast = [
            boss[boss.length - 1],
            boss[boss.length - 2]
        ]

        boss.pop()
        boss.pop()
        const bossName = boss.reduce((prev, curr) => `${prev} ${curr}`, "")

        seedIntRRHH.data.push({
            rut: row[0],
            nombres: userName[1],
            apellido1: userLast[0],
            apellido2: userLast[1],
            area: row[2],
            cargo: row[3],
            genero: row[4],
            fechaNacim: fechaNacim,
            jefeNombres: bossName,
            jefeApellido1: bossLast[0],
            jefeApellido2: bossLast[1]
        })
    } else {
        seedIntRRHH.data.push({
            rut: row[0],
            nombres: userName[1],
            apellido1: userLast[0],
            apellido2: userLast[1],
            area: row[2],
            cargo: row[3],
            genero: row[4],
            fechaNacim: fechaNacim
        })
    }
})

//Create Entities
seedIntRRHH.action = ()