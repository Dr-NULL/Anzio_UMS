import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Area } from "./area";

@Entity({ name: "Cargo" })
export class Cargo extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;
    
    @Column({ type: "varchar", length: 50 })
    descripc: string;
}