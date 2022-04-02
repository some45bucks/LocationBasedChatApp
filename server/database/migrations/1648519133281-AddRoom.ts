import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddRoom1648519133281 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'room',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'roomkey',
            type: 'text',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'longitude',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'latitude',
            type: 'float',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('room');
  }
}
