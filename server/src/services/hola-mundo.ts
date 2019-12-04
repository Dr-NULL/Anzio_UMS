import { Service } from ">/tool/service";

export const srvHolaMundo = new Service()
srvHolaMundo.method = "get"
srvHolaMundo.path = "/"
srvHolaMundo.callback = (req, res) => {
    res.send("jajaja dale men relax")
}