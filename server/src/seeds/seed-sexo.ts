import { Sexo } from "../models/sexo";
import { Seed } from "../tool/orm";

export const seedSexo = new Seed(Sexo)
seedSexo.data = [
    { cod: "M", descripc: "Masculino" },
    { cod: "F", descripc: "Femenino" }
]