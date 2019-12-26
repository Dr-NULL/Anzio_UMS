import { Request, Response } from "express";
import { Usuario } from "../models/usuario";
import { StatusCodes } from "./api";

export interface Messages {
    isNotLogged?: string;
    isUnauthorized?: string;
}

export async function isAdmin(req: Request, res: Response, msg: Messages = null) {
    // Chequear existencia
    if (msg == null) {
        msg = {}
    }

    // Chequear Integridad
    if (msg.isNotLogged == null) {
        msg.isNotLogged = "Necesita autentificarse para realizar esta acción."
    }
    if (msg.isUnauthorized == null) {
        msg.isUnauthorized = "Usted no posee los permisos necesarios para realizar esta acción."
    }

    // Analizar credenciales
    if (!req.session.isCreated) {
        res.api.failed({
            HttpResponse: StatusCodes.cod401,
            details: msg.isNotLogged
        })

        return false
    } else {
        const user = await Usuario.findOne({ id: req.session.data.id })
        if (user == null) {
            res.api.failed({
                HttpResponse: StatusCodes.cod403,
                details: msg.isUnauthorized
            })

            return false
        } else {
            return true
        }
    }
}