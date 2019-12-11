import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Area } from "./area";
import { Cargo } from "./cargo";

@Entity({ name: "RelAreaCargo" })
export class RelAreaCargo extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: Number;

    @ManyToOne(type => Area, x => x.id)
    area: Area

    @ManyToOne(type => Cargo, x => x.id)
    cargo: Cargo
}