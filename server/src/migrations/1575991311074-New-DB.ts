import {MigrationInterface, QueryRunner} from "typeorm";

export class NewDB1575991311074 implements MigrationInterface {
    name = 'NewDB1575991311074'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "Area" ("id" int NOT NULL IDENTITY(1,1), "descripc" varchar(50) NOT NULL, CONSTRAINT "PK_341ae1b6d91d85710f16035b885" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "Cargo" ("id" int NOT NULL IDENTITY(1,1), "descripc" varchar(50) NOT NULL, CONSTRAINT "PK_6f39d228c1565b713adcde8edae" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "Genero" ("id" int NOT NULL IDENTITY(1,1), "cod" varchar(1) NOT NULL, "descripc" varchar(20) NOT NULL, CONSTRAINT "PK_b829204c76a525595b67b4dc1f0" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "IntRRHH" ("id" int NOT NULL IDENTITY(1,1), "rut" varchar(15), "nombres" varchar(100), "apellido1" varchar(100), "apellido2" varchar(100), "area" varchar(100), "cargo" varchar(100), "genero" varchar(2), "fechaNacim" date, "jefeNombres" varchar(100), "jefeApellido1" varchar(100), "jefeApellido2" varchar(100), CONSTRAINT "PK_6e1987cc379f7c4ec102848a70e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "RelAreaCargo" ("id" int NOT NULL IDENTITY(1,1), "areaId" int, "cargoId" int, CONSTRAINT "PK_e490d17fa8ee70ab9da2383ad0f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "Usuario" ("id" int NOT NULL IDENTITY(1,1), "nick" varchar(15), "pass" varchar(512), "token" varchar(512), "isActive" bit NOT NULL CONSTRAINT "DF_24c7df5582a4e4b2d3b200c6e4d" DEFAULT 0, "rut" varchar(12) NOT NULL, "nombres" varchar(100) NOT NULL, "apellidoP" varchar(100) NOT NULL, "apellidoM" varchar(100) NOT NULL, "fechaNacim" date NOT NULL, "fechaCreac" date, "generoId" int, "relAreaCargoId" int, CONSTRAINT "PK_925c3fc5494373e254405c000eb" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "RelAreaCargo" ADD CONSTRAINT "FK_a54d0e9b9912d156c9cf4c8b984" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "RelAreaCargo" ADD CONSTRAINT "FK_97774213d00295f64eb9aabab6a" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "Usuario" ADD CONSTRAINT "FK_2308ae5e0697abb9d2b2aa50017" FOREIGN KEY ("generoId") REFERENCES "Genero"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "Usuario" ADD CONSTRAINT "FK_9b63986068abd363d3d0b46fd67" FOREIGN KEY ("relAreaCargoId") REFERENCES "RelAreaCargo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Usuario" DROP CONSTRAINT "FK_9b63986068abd363d3d0b46fd67"`, undefined);
        await queryRunner.query(`ALTER TABLE "Usuario" DROP CONSTRAINT "FK_2308ae5e0697abb9d2b2aa50017"`, undefined);
        await queryRunner.query(`ALTER TABLE "RelAreaCargo" DROP CONSTRAINT "FK_97774213d00295f64eb9aabab6a"`, undefined);
        await queryRunner.query(`ALTER TABLE "RelAreaCargo" DROP CONSTRAINT "FK_a54d0e9b9912d156c9cf4c8b984"`, undefined);
        await queryRunner.query(`DROP TABLE "Usuario"`, undefined);
        await queryRunner.query(`DROP TABLE "RelAreaCargo"`, undefined);
        await queryRunner.query(`DROP TABLE "IntRRHH"`, undefined);
        await queryRunner.query(`DROP TABLE "Genero"`, undefined);
        await queryRunner.query(`DROP TABLE "Cargo"`, undefined);
        await queryRunner.query(`DROP TABLE "Area"`, undefined);
    }

}
