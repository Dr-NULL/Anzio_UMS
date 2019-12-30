import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "iUsuario" })
export class UsuarioInt extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;
    
    @Column({ type: "varchar", length: 100, nullable: true })
    rut: string;
    
    @Column({ type: "varchar", length: 100, nullable: true })
    nombres: string;
    
    @Column({ type: "varchar", length: 100, nullable: true })
    apellidoP: string;
    
    @Column({ type: "varchar", length: 100, nullable: true })
    apellidoM: string;
    
    @Column({ type: "varchar", length: 100, nullable: true })
    area: string;
    
    @Column({ type: "varchar", length: 100, nullable: true })
    cargo: string;
    
    @Column({ type: "varchar", length: 100, nullable: true })
    sexo: string;
    
    @Column({ type: "varchar", length: 100, nullable: true })
    fechaNacim: Date;
    
    @Column({ type: "varchar", length: 100, nullable: true })
    rutJefe: string;
    
    @Column({ type: "varchar", length: 100, nullable: true })
    email: string
}