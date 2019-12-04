import {MigrationInterface, QueryRunner} from "typeorm";

export class testORM1575492747781 implements MigrationInterface {
    name = 'testORM1575492747781'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "Usuario" ("id" int NOT NULL IDENTITY(1,1), "nick" nvarchar(15) NOT NULL, "pass" nvarchar(512), "token" nvarchar(512), "firstName" nvarchar(100) NOT NULL, "lastNameP" nvarchar(100) NOT NULL, "lastNameM" nvarchar(100) NOT NULL, CONSTRAINT "PK_925c3fc5494373e254405c000eb" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "Usuario"`, undefined);
    }

}
