import { Seed } from "../tool/orm";
import { Area } from "../models/area";

export const seedArea = new Seed(Area)
seedArea.data = [
    { descripc: "SYSTEM" }
]