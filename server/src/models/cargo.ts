import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "Cargo" })
export class Cargo{
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "varchar", length: 100, unique: true })
    descripc: string;
}