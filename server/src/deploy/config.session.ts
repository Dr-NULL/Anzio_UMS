import { app } from ">/.";
import { crossover } from "session-crossover";
import { Path } from ">/tool/config";

export function configSession() {
    app.use(crossover({
        cookieName: "session",
        isEncrypted: true,
        expires: 30,
        path: Path.root + "data/session/"
    }))
}