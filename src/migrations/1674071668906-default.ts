import { MigrationInterface, QueryRunner } from "typeorm";

export class default1674071668906 implements MigrationInterface {
    name = 'default1674071668906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`subjects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`room_subject\` (\`room_id\` int NOT NULL, \`subject_id\` int NOT NULL, INDEX \`IDX_f227421d2ef64ab086261ac07f\` (\`room_id\`), INDEX \`IDX_a05f10c497f5f7db3022664a6d\` (\`subject_id\`), PRIMARY KEY (\`room_id\`, \`subject_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`room_subject\` ADD CONSTRAINT \`FK_f227421d2ef64ab086261ac07fd\` FOREIGN KEY (\`room_id\`) REFERENCES \`subjects\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`room_subject\` ADD CONSTRAINT \`FK_a05f10c497f5f7db3022664a6d6\` FOREIGN KEY (\`subject_id\`) REFERENCES \`rooms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room_subject\` DROP FOREIGN KEY \`FK_a05f10c497f5f7db3022664a6d6\``);
        await queryRunner.query(`ALTER TABLE \`room_subject\` DROP FOREIGN KEY \`FK_f227421d2ef64ab086261ac07fd\``);
        await queryRunner.query(`DROP INDEX \`IDX_a05f10c497f5f7db3022664a6d\` ON \`room_subject\``);
        await queryRunner.query(`DROP INDEX \`IDX_f227421d2ef64ab086261ac07f\` ON \`room_subject\``);
        await queryRunner.query(`DROP TABLE \`room_subject\``);
        await queryRunner.query(`DROP TABLE \`subjects\``);
    }

}
