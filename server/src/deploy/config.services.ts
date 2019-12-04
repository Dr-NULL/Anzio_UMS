import { app, srv } from ">/.";

export function configServices() {
    srv.forEach(endPoint => {
        switch(endPoint.method) {
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
}