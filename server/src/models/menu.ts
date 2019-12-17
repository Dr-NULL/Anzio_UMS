import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from "typeorm";
import { Sistema } from "./sistema";
import { Perfil } from "./perfil";

@Entity({ name: "Menu" })
export class Menu extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;
    
    @Column({ type:"varchar", length: 50 })
    nombre: string;
    
    @Column({ type: "varchar", length: 512 })
    descripc: string;
    
    @Column({ type: "varchar", length: 128 })
    url: string;
    
    @Column({ type: "varchar", length: 50 })
    icono: string;
    
    @ManyToOne(type => Menu, x => x.id, { nullable: true })
    @JoinTable()
    padre: Promise<Menu[]>;

    @ManyToOne(type => Sistema, x => x.id, { eager: true })
    @JoinTable()
    sistema: Sistema;

    @ManyToOne(type => Perfil, x => x.id, { eager: true })
    @JoinTable()
    perfil: Perfil;
}