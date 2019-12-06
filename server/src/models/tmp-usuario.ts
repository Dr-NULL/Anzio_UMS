import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tmpUsuario" })
export class TmpUsuario {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "nvarchar", length: 255, nullable: true })
    rut: string;
    
    @Column({ type: "nvarchar", length: 255, nullable: true })
    nombre: string;
    
    @Column({ type: "nvarchar", length: 255, nullable: true })
    area: string;
    
    @Column({ type: "nvarchar", length: 255, nullable: true })
    cargo: string;
    
    @Column({ type: "nvarchar", length: 255, nullable: true })
    sexo: string;
    
    @Column({ type: "nvarchar", length: 255, nullable: true })
    fechaNac: Date;
    
    @Column({ type: "nvarchar", length: 255, nullable: true })
    jefeDirecto: string;
}