import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "IntLoad" })
export class IntLoad extends BaseEntity{
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "varchar", length: 15, nullable: true})
    rut: string;
    
    @Column({ type: "varchar", length: 100, nullable: true})
    nombres: string;
    
    @Column({ type: "varchar", length: 100, nullable: true})
    apellido1: string;
    
    @Column({ type: "varchar", length: 100, nullable: true})
    apellido2: string;
    
    @Column({ type: "varchar", length: 100, nullable: true})
    area: string;
    
    @Column({ type: "varchar", length: 100, nullable: true})
    cargo: string;
    
    @Column({ type: "varchar", length: 2, nullable: true})
    genero: string;
    
    @Column({ type: "date", nullable: true})
    fechaNacim: Date;
    
    @Column({ type: "varchar", length: 100, nullable: true})
    jefeNombres: string;
    
    @Column({ type: "varchar", length: 100, nullable: true})
    jefeApellido1: string;
    
    @Column({ type: "varchar", length: 100, nullable: true})
    jefeApellido2: string;
}