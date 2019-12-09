import { join } from "path";
import { File } from "./file";
import { ConnectionOptions } from "typeorm";
import Log from "./log";

export module Path {
    export const main = join(__dirname, "..", "..", "..")
    export const server = join(main, "server")
    export const data = join(main, "data")
    export module Data {
        export const session = join(data, "session")
        export const sources = join(data, "sources")
        export module Sources {
            export const rrhh = join(sources, "rrhh.csv")
        }
    }
}

export module Config {
    export let App: iConfig
    export let Orm: ConnectionOptions

    try {
        const fsApp = new File(join(Path.server, "appconfig.json"))
        const rawApp = fsApp.readTextSync()
        App = JSON.parse(rawApp)
        
        const fsOrm = new File(join(Path.server, App.omrConfig))
        const rawOrm = fsOrm.readTextSync()
        Orm = JSON.parse(rawOrm)
    } catch (err) {
        Log.er(err + "\n")
    }
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
    omrConfig: string; 
    Server: iServer;
    Session: iSession;
}