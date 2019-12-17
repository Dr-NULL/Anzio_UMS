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
    apellidoP: string;
    
    @Column({ type: "varchar", length: 100, nullable: true})
    apellidoM: string;
    
    @Column({ type: "varchar", length: 100, nullable: true})
    area: string;
    
    @Column({ type: "varchar", length: 100, nullable: true})
    cargo: string;
    
    @Column({ type: "varchar", length: 2, nullable: true})
    sexo: string;
    
    @Column({ type: "date", nullable: true})
    fechaNacim: Date;
    
    @Column({ type: "varchar", length: 100, nullable: true})
    jefeRUT: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    email: string;
}