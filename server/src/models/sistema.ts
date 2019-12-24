import { BaseEntity, Entity, Column, PrimaryGeneratedColumn,  } from "typeorm";

@Entity({ name: "Sistema" })
export class Sistema extends BaseEntity{
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "bit", default: 1 })
    isActive: boolean;
    
    @Column({ type: "varchar", length: 50 })
    nombre: string;
    
    @Column({ type: "varchar", length: 512 })
    descripc: string;
    
    @Column({ type: "varchar", length: 50, nullable: true })
    imgType: string;

    @Column({ type: "varbinary", length: "max", nullable: true })
    imgData: Buffer;
    
    @Column({ type: "varchar", length: 20, nullable: true })
    icon: string;
    
    @Column({ type: "varchar", length: 248 })
    url: string;
    
    @Column({ type: "varchar", length: 128 })
    db: string;
}