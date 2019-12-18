import {MigrationInterface, QueryRunner} from "typeorm";

export class newDB1576681113495 implements MigrationInterface {
    name = 'newDB1576681113495'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "Area" ("id" int NOT NULL IDENTITY(1,1), "descripc" varchar(50) NOT NULL, CONSTRAINT "PK_341ae1b6d91d85710f16035b885" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "Cargo" ("id" int NOT NULL IDENTITY(1,1), "descripc" varchar(50) NOT NULL, CONSTRAINT "PK_6f39d228c1565b713adcde8edae" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "IntLoad" ("id" int NOT NULL IDENTITY(1,1), "rut" varchar(15), "nombres" varchar(100), "apellidoP" varchar(100), "apellidoM" varchar(100), "area" varchar(100), "cargo" varchar(100), "sexo" varchar(2), "fechaNacim" date, "jefeRUT" varchar(100), "email" varchar(100), CONSTRAINT "PK_33a19cb6473d221e8c0e5e11adc" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "Sistema" ("id" int NOT NULL IDENTITY(1,1), "nombre" varchar(50) NOT NULL, "descripc" varchar(512) NOT NULL, "logo" varbinary, "url" varchar(248) NOT NULL, "db" varchar(128) NOT NULL, CONSTRAINT "PK_a12ba8cfb3b84749fcaf19ee20e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "Perfil" ("id" int NOT NULL IDENTITY(1,1), "nombre" varchar(50) NOT NULL, "descripc" varchar(512) NOT NULL, "url" varchar(128) NOT NULL, "icono" varchar(50) NOT NULL, CONSTRAINT "PK_e6e3a57f5744ed15a5d411a5340" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "Menu" ("id" int NOT NULL IDENTITY(1,1), "nombre" varchar(50) NOT NULL, "descripc" varchar(512) NOT NULL, "url" varchar(128) NOT NULL, "icono" varchar(50) NOT NULL, "padreId" int, "sistemaId" int, "perfilId" int, CONSTRAINT "PK_b2683c330c5e6d700266a6f46d0" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "Sexo" ("id" int NOT NULL IDENTITY(1,1), "cod" varchar(1) NOT NULL, "descripc" varchar(20) NOT NULL, CONSTRAINT "PK_3fd2ddb3927f7fe489558616b1d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "Usuario" ("id" int NOT NULL IDENTITY(1,1), "nick" varchar(15), "pass" varchar(512), "token" varchar(512), "email" varchar(100), "isActive" bit NOT NULL CONSTRAINT "DF_24c7df5582a4e4b2d3b200c6e4d" DEFAULT 0, "isSystem" bit NOT NULL CONSTRAINT "DF_e665656f264b6e485f73a1529b2" DEFAULT 0, "isAdmin" bit NOT NULL CONSTRAINT "DF_f807cced337595af8a9e8807fce" DEFAULT 0, "rut" varchar(12) NOT NULL, "nombres" varchar(100) NOT NULL, "apellidoP" varchar(100) NOT NULL, "apellidoM" varchar(100) NOT NULL, "fechaNacim" date NOT NULL, "fechaInserc" date CONSTRAINT "DF_a702dda5433280f0fea0b506e43" DEFAULT CURRENT_TIMESTAMP, "fechaElimin" date, "fechaActivac" date, "fechaDesact" date, "sexoId" int, "areaId" int, "cargoId" int, CONSTRAINT "PK_925c3fc5494373e254405c000eb" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "RelUsuarioMenu" ("id" int NOT NULL IDENTITY(1,1), "fechaCreac" date NOT NULL CONSTRAINT "DF_42ce0f8ce0d5c64eabf2a105126" DEFAULT GETDATE(), "usuarioId" int, "menuId" int, CONSTRAINT "PK_6980f10351c3f42c7736a87e633" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "Menu" ADD CONSTRAINT "FK_ac12259d8810919fe216b47ddd9" FOREIGN KEY ("padreId") REFERENCES "Menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "Menu" ADD CONSTRAINT "FK_c4e354780bbbd1079644db6bdb0" FOREIGN KEY ("sistemaId") REFERENCES "Sistema"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "Menu" ADD CONSTRAINT "FK_02d7ea9adc75f9231dd3d0139f0" FOREIGN KEY ("perfilId") REFERENCES "Perfil"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "Usuario" ADD CONSTRAINT "FK_d70c2f339b4a8218ec881c72efa" FOREIGN KEY ("sexoId") REFERENCES "Sexo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "Usuario" ADD CONSTRAINT "FK_e962024d0aa9a2e5c5444ddeeb5" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "Usuario" ADD CONSTRAINT "FK_0e15649a7d070fa0e18f86884c7" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "RelUsuarioMenu" ADD CONSTRAINT "FK_23db456b96410360b3985782906" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "RelUsuarioMenu" ADD CONSTRAINT "FK_717493a7b2e421d1aafcc67cfa6" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "RelUsuarioMenu" DROP CONSTRAINT "FK_717493a7b2e421d1aafcc67cfa6"`, undefined);
        await queryRunner.query(`ALTER TABLE "RelUsuarioMenu" DROP CONSTRAINT "FK_23db456b96410360b3985782906"`, undefined);
        await queryRunner.query(`ALTER TABLE "Usuario" DROP CONSTRAINT "FK_0e15649a7d070fa0e18f86884c7"`, undefined);
        await queryRunner.query(`ALTER TABLE "Usuario" DROP CONSTRAINT "FK_e962024d0aa9a2e5c5444ddeeb5"`, undefined);
        await queryRunner.query(`ALTER TABLE "Usuario" DROP CONSTRAINT "FK_d70c2f339b4a8218ec881c72efa"`, undefined);
        await queryRunner.query(`ALTER TABLE "Menu" DROP CONSTRAINT "FK_02d7ea9adc75f9231dd3d0139f0"`, undefined);
        await queryRunner.query(`ALTER TABLE "Menu" DROP CONSTRAINT "FK_c4e354780bbbd1079644db6bdb0"`, undefined);
        await queryRunner.query(`ALTER TABLE "Menu" DROP CONSTRAINT "FK_ac12259d8810919fe216b47ddd9"`, undefined);
        await queryRunner.query(`DROP TABLE "RelUsuarioMenu"`, undefined);
        await queryRunner.query(`DROP TABLE "Usuario"`, undefined);
        await queryRunner.query(`DROP TABLE "Sexo"`, undefined);
        await queryRunner.query(`DROP TABLE "Menu"`, undefined);
        await queryRunner.query(`DROP TABLE "Perfil"`, undefined);
        await queryRunner.query(`DROP TABLE "Sistema"`, undefined);
        await queryRunner.query(`DROP TABLE "IntLoad"`, undefined);
        await queryRunner.query(`DROP TABLE "Cargo"`, undefined);
        await queryRunner.query(`DROP TABLE "Area"`, undefined);
    }

}
