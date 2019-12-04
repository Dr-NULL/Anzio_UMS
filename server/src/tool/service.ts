import express from "express"
import { Request, Dictionary } from "express-serve-static-core";

let app = express()
app.get("/", (req, res) => {
    
})

export class Service {
    private _method : "get"|"post";
    public get method() : "get"|"post" {
        return this._method;
    }
    public set method(v : "get"|"post") {
        this._method = v;
    }
    
    private _path : string;
    public get path() : string {
        return this._path;
    }
    public set path(v : string) {
        this._path = v;
    }
    
    private _callback : (req: Request<Dictionary<string>>, res: express.Response) => void;
    public get callback() : (req: Request<Dictionary<string>>, res: express.Response) => void {
        return this._callback;
    }
    public set callback(v : (req: Request<Dictionary<string>>, res: express.Response) => void) {
        this._callback = v;
    }

    public constructor() {
        this._method = "get"
        this._path = "/"
        this._callback = (req, res) => {}
    }
}

export default Service