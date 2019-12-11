import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Genero } from "./genero";
import { RelAreaCargo } from "./rel-area-cargo"

@Entity({ name: "Usuario" })
export class Usuario extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;
    
    @Column({ type: "varchar", length: "15", nullable: true })
    nick: string;
    
    @Column({ type: "varchar", length: 512, nullable: true })
    pass: string;
    
    @Column({ type: "varchar", length: 512, nullable: true })
    token: string;
    
    @Column({ type: "bit", default: 0 })
    isActive: boolean;
    
    @Column({ type: "varchar", length: 12 })
    rut: string;
    
    @Column({ type: "varchar", length: 100 })
    nombres: string;
    
    @Column({ type: "varchar", length: 100 })
    apellidoP: string;
    
    @Column({ type: "varchar", length: 100 })
    apellidoM: string

    @Column({ type: "date" })
    fechaNacim: Date;

    @Column({ type: "date", nullable: true })
    fechaCreac: Date;
    
    @ManyToOne(type => Genero, genero => genero.id)
    genero: Genero;
    
    @ManyToOne(type => RelAreaCargo, area => area.id)
    relAreaCargo: RelAreaCargo;
}