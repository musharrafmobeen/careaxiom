import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTestUsers1736137268119 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO users
(email, "name", age)
VALUES('test@gmail.com', 'test', 17),('test2@gmail.com','test2',25),('test3@gmail.com','test3',20),('test4@gmail.com','test4',18);
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
