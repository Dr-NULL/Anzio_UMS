import { routes } from "./routes";
import { app } from ".";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "../tool/api";

export function deployRoutes(){
    routes.forEach(route => {
        route.path = "/api" + route.path

        switch (route.method) {
            case "get":
                app.get(route.path, wrapAsync(route.callback))
                break
            case "post":
                app.post(route.path, wrapAsync(route.callback))
                break
            case "options":
                app.options(route.path, wrapAsync(route.callback))
                break
            case "put":
                app.put(route.path, wrapAsync(route.callback))
                break
            case "merge":
                app.merge(route.path, wrapAsync(route.callback))
                break
            case "delete":
                app.delete(route.path, wrapAsync(route.callback))
                break
        }
    })

    app.all("*", (req, res) => {
        res.api.failed({
            HttpResponse: StatusCodes.cod404,
            details: "El URL que está solicitando no existe..."
        })
    })
}

function wrapAsync(fn: any) {
    return function(req: Request, res: Response, nxt: NextFunction) {
        try {
            fn(req, res, nxt)
        } catch (err) {
            nxt(err)
        }
    }
}