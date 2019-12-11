import { Log } from "./log";
import { join } from "path";
import { File } from "./file";

export module Path {
    export const main = join(__dirname, "..", "..", "..")
    export const server = join(main, "server")
    export const data = join(main, "data")
    export module Data {
        export const corrupted = join(data, "corrupted.flow")
        export const session = join(data, "session")
        export const sources = join(data, "sources")
        export module Sources {
            export const rrhh = join(sources, "rrhh.csv")
        }
    }
}


export let Config: iConfig
try {
    const fsApp = new File(join(Path.server, "appconfig.json"))
    const rawApp = fsApp.readTextSync()
    Config = JSON.parse(rawApp)
} catch (err) {
    Log.er("500 ERROR")
    Log.ln(err.message + "\n")
}

interface iServer {
    port: number;
    Cors: string[];
}

interface iSession {
    duration: 30;
    cookieName: string;
    isEncrypted: boolean;
}

interface iConfig {
    Server: iServer;
    Session: iSession;
}