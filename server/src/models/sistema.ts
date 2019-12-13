import { BaseEntity, Entity, Column, PrimaryGeneratedColumn,  } from "typeorm";

@Entity({ name: "Sistema" })
export class Sistema extends BaseEntity{
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;
    
    @Column({ type: "varchar", length: 50 })
    nombre: string;
    
    @Column({ type: "varchar", length: 512 })
    descripc: string;
    
    @Column({ type: "image", nullable: true })
    logo: Buffer;
    
    @Column({ type: "varchar", length: 248 })
    url: string;
    
    @Column({ type: "varchar", length: 128 })
    db: string;
}