import { app } from ".";
import { Config } from "../tool/config";
import cors, { CorsOptions } from "cors";

export function deployCors() {
    const corsOpt: CorsOptions = {
        credentials: true,
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        origin: (origin, callback) => {
            const allowed = Config.App.Server.Cors

            if (allowed.includes(origin) || (origin == undefined)) {
                callback(null, true)
            } else {
                callback(null, false)
            }
        }
    }
    app.use(cors(corsOpt))
    app.options("*", cors(corsOpt))
}