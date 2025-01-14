import vine from '@vinejs/vine'

export const createContact = vine.compile(
  vine.object({
    firstName: vine.string(),
    lastName: vine.string().optional(),
    noHp: vine.string().minLength(12).maxLength(15),
  })
)
export const updateContact = vine.compile(
  vine.object({
    firstName: vine.string(),
    lastName: vine.string().optional(),
    noHp: vine.string().minLength(13).maxLength(15).optional(),
  })
)
