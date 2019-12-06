import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Sexo" })
export class Sexo {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "varchar", length: 1 })
    cod: string;

    @Column({ type: "varchar", length: 20, unique: true })
    descripc: string;
}