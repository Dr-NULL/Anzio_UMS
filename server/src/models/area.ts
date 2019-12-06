import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Area" })
export class Area {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "varchar", length: 50, unique: true })
    descripc: string;
}