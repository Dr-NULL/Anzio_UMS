import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDB1575642619923 implements MigrationInterface {
    name = 'CreateDB1575642619923'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "Area" ("id" int NOT NULL IDENTITY(1,1), "descripc" varchar(50) NOT NULL, CONSTRAINT "UQ_4b35f4248ab92058c360a186a9f" UNIQUE ("descripc"), CONSTRAINT "PK_341ae1b6d91d85710f16035b885" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "Cargo" ("id" int NOT NULL IDENTITY(1,1), "descripc" varchar(100) NOT NULL, CONSTRAINT "UQ_e1f8fda9a938ef3cac88f2abd04" UNIQUE ("descripc"), CONSTRAINT "PK_6f39d228c1565b713adcde8edae" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "Sexo" ("id" int NOT NULL IDENTITY(1,1), "cod" varchar(1) NOT NULL, "descripc" varchar(20) NOT NULL, CONSTRAINT "UQ_359c11b453fb19e20eef954e208" UNIQUE ("descripc"), CONSTRAINT "PK_3fd2ddb3927f7fe489558616b1d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "tmpUsuario" ("id" int NOT NULL IDENTITY(1,1), "rut" nvarchar(255), "nombre" nvarchar(255), "area" nvarchar(255), "cargo" nvarchar(255), "sexo" nvarchar(255), "fechaNac" nvarchar(255), "jefeDirecto" nvarchar(255), CONSTRAINT "PK_93a845c06e610c39bf049cdf04b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "Usuario" ("id" int NOT NULL IDENTITY(1,1), "nick" nvarchar(15) NOT NULL, "pass" nvarchar(512), "token" nvarchar(512), "rut" varchar(12) NOT NULL, "firstName" nvarchar(100) NOT NULL, "lastNameP" nvarchar(100) NOT NULL, "lastNameM" nvarchar(100) NOT NULL, "email" nvarchar(100) NOT NULL, "fechaNacim" date NOT NULL, "cargoId" int, "areaId" int, "sexoId" int, CONSTRAINT "UQ_76ddba24432664ec4a4d2f0555e" UNIQUE ("rut"), CONSTRAINT "PK_925c3fc5494373e254405c000eb" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "Usuario" ADD CONSTRAINT "FK_0e15649a7d070fa0e18f86884c7" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "Usuario" ADD CONSTRAINT "FK_e962024d0aa9a2e5c5444ddeeb5" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "Usuario" ADD CONSTRAINT "FK_d70c2f339b4a8218ec881c72efa" FOREIGN KEY ("sexoId") REFERENCES "Sexo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Usuario" DROP CONSTRAINT "FK_d70c2f339b4a8218ec881c72efa"`, undefined);
        await queryRunner.query(`ALTER TABLE "Usuario" DROP CONSTRAINT "FK_e962024d0aa9a2e5c5444ddeeb5"`, undefined);
        await queryRunner.query(`ALTER TABLE "Usuario" DROP CONSTRAINT "FK_0e15649a7d070fa0e18f86884c7"`, undefined);
        await queryRunner.query(`DROP TABLE "Usuario"`, undefined);
        await queryRunner.query(`DROP TABLE "tmpUsuario"`, undefined);
        await queryRunner.query(`DROP TABLE "Sexo"`, undefined);
        await queryRunner.query(`DROP TABLE "Cargo"`, undefined);
        await queryRunner.query(`DROP TABLE "Area"`, undefined);
    }

}
