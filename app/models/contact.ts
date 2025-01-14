import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Contact extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare firstName: string
  @column()
  declare lastName?: string
  @column()
  declare noHp: string
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
