import { app } from ".";
import { Request, Response, NextFunction } from "express";
import { StatusCodes, Api } from "../tool/api";

export function deployErrors() {
    app.use((err: Error | string, req: Request, res: Response, nxt: NextFunction) => {
        let msg = (err as Error).message
        if (msg == null) {
            msg = err as string
        }

        console.clear()
        console.log(">> INTERNAL SERVER ERROR ;-; <<")
        console.log("===============================")
        console.log(msg)
        console.log("-------------------------------\n")

        res.setHeader("Access-Control-Allow-Origin", req.headers["access-control-allow-origin"])
        res.setHeader("Access-Control-Allow-Credentials", "true")
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE")
        res.type("application/vnd.api+json")

        const api = new Api(req, res)
        api.failed({
            HttpResponse: StatusCodes.cod500,
            details: msg
        })
    })
}