import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, } from "typeorm";
import { Cargo } from "./cargo";
import { Area } from "./area";
import { Sexo } from "./sexo";

@Entity({ name: "Usuario" })
export class Usuario {

    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ length: 15 })
    nick: string;

    @Column({ 
        length: 512,
        nullable: true
    })
    pass: string;

    @Column({ 
        length: 512,
        nullable: true
    })
    token: string;

    @Column({ type: "varchar", length: 12, unique: true })
    rut: string;

    @Column({ length: 100 })
    firstName: string;

    @Column({ length: 100 })
    lastNameP: string;

    @Column({ length: 100 })
    lastNameM: string;

    @Column({ length: 100 })
    email: string;

    @Column({ type: "date" })
    fechaNacim: Date;

    @ManyToOne(type => Cargo, me => me.id)
    cargo: Cargo

    @ManyToOne(type => Area, me => me.id)
    area: Area

    @ManyToOne(type => Sexo, me => me.id)
    sexo: Sexo
}