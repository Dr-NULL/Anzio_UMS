import { Seed } from "../tool/orm";
import { Area } from "../models/area";
import { intRRHH } from "../models/int-rrhh";

export const seedArea = new Seed(Area)
seedArea.data = [
    { descripc: "SYSTEM" }
]