import { urlencoded, json } from "body-parser";
import { crossover } from "session-crossover";

import { Path } from ">/tool/config";
import { router } from "./routing";
import { Log } from ">/tool/log";
import { app } from "..";

export function deployServer() {
    //Body Parser
    app.use(urlencoded({ extended: false }))
    app.use(json({ strict: false }))

    //Sessiones
    app.use(crossover({
        cookieName: "session",
        isEncrypted: true,
        expires: 30,
        path: Path.source.session
    }))

    //Routing
    router.forEach(endPoint => {
        switch (endPoint.method) {
            case "get":
                app.get(
                    endPoint.path,
                    endPoint.callback
                )
                break
            case "post":
                app.post(
                    endPoint.path,
                    endPoint.callback
                )
                break
        }
    })

    //Levantar Server
    app.listen(80, () => {
        
    })
}