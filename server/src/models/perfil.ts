import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Perfil" })
export class Perfil extends BaseEntity{
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
}