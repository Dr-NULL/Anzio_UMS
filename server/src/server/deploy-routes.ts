import { routes } from "./routes";
import { Path } from "../tool/config";
import { app } from ".";
import multer from "multer";

export function deployRoutes(){
    //Obtener archivos que se han subido
    const upload = multer({ dest: Path.Data.uploaded })

    routes.forEach(route => {
        route.path = "/api" + route.path

        switch (route.method) {
            case "get":
                app.get(route.path, route.callback)
                break
            case "post":
                app.post(route.path, route.callback)
                break
            case "options":
                app.options(route.path, route.callback)
                break
            case "put":
                app.put(route.path, route.callback)
                break
            case "merge":
                app.merge(route.path, route.callback)
                break
            case "delete":
                app.delete(route.path, route.callback)
                break
            case "form-data":
                app.post(
                    route.path,
                    upload.fields(route.fileReceive),
                    route.callback
                )
        }
    })
}