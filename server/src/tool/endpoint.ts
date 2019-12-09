import { Application, Request, Response } from "express";

export class EndPoint{
    private _method : "get" | "post" | "options" | "put" | "delete" | "merge";
    public get method() : "get" | "post" | "options" | "put" | "delete" | "merge" {
        return this._method;
    }
    public set method(v : "get" | "post" | "options" | "put" | "delete" | "merge") {
        this._method = v;
    }
    
    private _path : string;
    public get path() : string {
        return this._path;
    }
    public set path(v : string) {
        this._path = v;
    }
    
    private _callback : (req: Request, res: Response) => void;
    public get callback() : (req: Request, res: Response) => void {
        return this._callback;
    }
    public set callback(v : (req: Request, res: Response) => void) {
        this._callback = v;
    }
    
    public constructor(){
        this._method = "get"
        this._path = "/"
        this._callback = (req, res) => {
            res.send(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8" />
                        <title>Test Endpoint</title>
                    </head>
                    <body>
                        <h2>New Endpoint</h2>
                        <p>It's Works!!!</p>
                    </body>
                </html>
            `)
        }
    }

    public static register(app: Application, routes: EndPoint[]){
        routes.forEach(route => {
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
}