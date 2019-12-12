import { Seed } from "../tool/orm";
import { Cargo } from "../models/cargo";

export const seedCargo = new Seed(Cargo)
seedCargo.data = [
    { descripc: "SYSTEM" }
]