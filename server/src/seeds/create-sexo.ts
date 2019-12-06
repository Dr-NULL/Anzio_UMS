import { seed } from "./core";
import { Sexo } from "../models/sexo";

export const createSexo: seed<Sexo> = {
    type: Sexo,
    data: [
        { cod:"M", descripc: "Masculino" },
        { cod:"F", descripc: "Femenino" },
        { cod:"O", descripc: "Otro" }
    ]
}