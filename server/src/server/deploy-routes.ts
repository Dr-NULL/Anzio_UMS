import { routes } from "./routes";
import { app } from ".";

export function deployRoutes(){
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
        }
    })
}