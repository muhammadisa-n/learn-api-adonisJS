import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'contacts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name', 100).notNullable()
      table.string('last_name', 100).nullable()
      table.string('no_hp', 15).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
