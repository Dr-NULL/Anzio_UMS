import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Area" })
export class Area extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;
    
    @Column({ type:"varchar", length:"20" })
    descripc: string;
}