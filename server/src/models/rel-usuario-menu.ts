import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, } from "typeorm";
import { Usuario } from "./usuario";
import { Menu } from "./menu";

@Entity({ name: "RelUsuarioMenu" })
export class RelUsuarioMenu extends BaseEntity{
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "date", default: () => "GETDATE()" })
    fechaCreac: Date;

    @ManyToOne(type => Usuario, x => x.id, { eager: true })
    @JoinTable()
    usuario: Usuario;

    @ManyToOne(type => Menu, x => x.id, { eager: true })
    @JoinTable()
    menu: Menu;
}