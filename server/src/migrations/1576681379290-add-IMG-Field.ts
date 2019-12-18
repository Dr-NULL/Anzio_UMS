import {MigrationInterface, QueryRunner} from "typeorm";

export class addIMGField1576681379290 implements MigrationInterface {
    name = 'addIMGField1576681379290'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Sistema" ADD "img" varbinary`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Sistema" DROP COLUMN "img"`, undefined);
    }

}
