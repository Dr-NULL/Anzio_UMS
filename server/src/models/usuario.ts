import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from "typeorm";
import { Cargo } from "./cargo";
import { Area } from "./area";
import { Sexo } from "./sexo";

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
    
    @Column({ type: "bit", default: 0 })
    isSystem: boolean;
    
    @Column({ type: "bit", default: 0 })
    isAdmin: boolean;
    
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

    @Column({ type: "date", nullable: true, default: () =>  "CURRENT_TIMESTAMP" })
    fechaInserc: Date;

    @Column({ type: "date", nullable: true })
    fechaElimin: Date;

    @Column({ type: "date", nullable: true })
    fechaActivac: Date;

    @Column({ type: "date", nullable: true })
    fechaDesact: Date;
    
    @ManyToOne(type => Sexo, sexo => sexo.id, { eager: true })
    @JoinTable()
    sexo: Sexo;
    
    @ManyToOne(type => Area, area => area.id, { eager: true })
    @JoinTable()
    area: Area;
    
    @ManyToOne(type => Cargo, cargo => cargo.id, { eager: true })
    @JoinTable()
    cargo: Cargo;
}