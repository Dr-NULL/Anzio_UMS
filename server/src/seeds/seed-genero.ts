import { Genero } from "../models/genero";
import { Seed } from "../tool/orm";

export const seedGenero = new Seed(Genero)
seedGenero.data = [
    { cod: "M", descripc: "Masculino" },
    { cod: "F", descripc: "Femenino" }
]