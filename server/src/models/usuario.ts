import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from "typeorm";
import { Sexo } from "./sexo";
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

    @Column({ type: "varchar", length: 100, nullable: true })
    email: string;
    
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
    
    @ManyToOne(type => Sexo, genero => genero.id, { eager: true })
    @JoinTable()
    genero: Sexo;
    
    @ManyToOne(type => RelAreaCargo, area => area.id, { eager: true })
    @JoinTable()
    relAreaCargo: RelAreaCargo;
}