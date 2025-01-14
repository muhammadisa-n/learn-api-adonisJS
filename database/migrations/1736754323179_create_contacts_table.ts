import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'contacts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('firstName', 100).notNullable()
      table.string('lastName', 100).nullable()
      table.string('noHp', 15).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
