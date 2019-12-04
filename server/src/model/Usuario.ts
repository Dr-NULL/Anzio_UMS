import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "Usuario" })
export class Usuario {

    @PrimaryGeneratedColumn()
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

    @Column({ length: 100 })
    firstName: string;

    @Column({ length: 100 })
    lastNameP: string;

    @Column({ length: 100 })
    lastNameM: string;

    
}
