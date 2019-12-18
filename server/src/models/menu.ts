import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, Tree, TreeChildren, TreeParent } from "typeorm";
import { Sistema } from "./sistema";
import { Perfil } from "./perfil";

@Entity({ name: "Menu" })
@Tree("materialized-path")
export class Menu extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;
    
    @Column({ type:"varchar", length: 50 })
    nombre: string;
    
    @Column({ type: "varchar", length: 512 })
    descripc: string;
    
    @Column({ type: "varchar", length: 128, nullable: true })
    url: string;
    
    @Column({ type: "varchar", length: 50 })
    icono: string;
    
    @TreeChildren()
    children: Menu[];
    
    @TreeParent()
    parent: Menu;
    
    @Column({ nullable: true })
    sistemaId: number;

    @ManyToOne(type => Sistema, x => x.id)
    @JoinTable()
    sistema: Sistema;

    @ManyToOne(type => Perfil, x => x.id, { nullable: true })
    @JoinTable()
    perfil: Perfil[];
}