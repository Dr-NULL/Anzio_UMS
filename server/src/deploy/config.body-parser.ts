import { app } from ">/.";
import * as BodyParser from "body-parser";

export function configBodyParser() {
    app.use(BodyParser.urlencoded({
        extended: false
    }))
    app.use(BodyParser.json({
        strict: false
    }))
}