import { app } from ".";
import { Api } from "../tool/api";
import { json, urlencoded } from "body-parser";

export function deployJson() {
    //Parsear data de peticiones POST
    app.use(json({ 
        strict: false,
        type: "application/vnd.api+json",
        limit: "50mb"
    }))
    app.use(urlencoded({ extended: false }))

    //Implementar estándar de API
    app.use((req, res, nxt) => {
        res.api = new Api(req, res)

        nxt()
    })
}