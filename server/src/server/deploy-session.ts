import { app } from ".";
import { crossover } from "session-crossover";
import { Path } from "../tool/config";

export function deploySession(){
    app.use(crossover({
        cookieName: "session",
        path: Path.Data.session,
        isEncrypted: true,
        expires: 30
    }))
}