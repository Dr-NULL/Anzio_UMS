import { Seed } from "../tool/orm";
import { Area } from "../models/area";
import { Cargo } from "../models/cargo";
import { intRRHH } from "../models/int-rrhh";
import Log from "../tool/log";
import { RelAreaCargo } from "../models/rel-area-cargo";

export const seedCargo = new Seed(Cargo)
seedCargo.action = async req => {
    const arrCargo: Array<{ 
        cargo: string,
    }> = await intRRHH.createQueryBuilder()
        .select("cargo")
        .distinct()
        .execute()

    //Agregar Cargo a la DB
    for (let item of arrCargo) {
        const inst = new Cargo()
        inst.descripc = item.cargo

        await Cargo.save(inst)
    }

    //Buscar relaciones
    const arrRel: Array<{
        area: string;
        cargo: string;
    }> = await intRRHH.createQueryBuilder()
        .select([
            "area",
            "cargo"
        ])
        .distinct()
        .execute()

    for (let item of arrRel ) {
        const objArea = await Area.findOne({
            descripc: item.area
        })

        const objCargo = await Cargo.findOne({
            descripc: item.cargo
        })

        try {
            const objRel = new RelAreaCargo()
            objRel.area = objArea
            objRel.cargo = objCargo

            await RelAreaCargo.save(objRel)
        } catch(err) {
            Log.er(err)
            process.exit()
        }
    }
}