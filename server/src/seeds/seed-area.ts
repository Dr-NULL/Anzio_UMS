import { Seed } from "../tool/orm";
import { Area } from "../models/area";
import { intRRHH } from "../models/int-rrhh";

export const seedArea = new Seed(Area)
seedArea.action = async (req) => {
    const arrArea: Array<{ area: string }> = await intRRHH.createQueryBuilder()
        .select("area")
        .distinct()
        .execute()

    arrArea.forEach(item => {
        const inst = new Area()
        inst.descripc = item.area

        Area.save(inst)
    })
}