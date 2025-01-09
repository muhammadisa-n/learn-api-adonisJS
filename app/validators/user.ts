import vine from '@vinejs/vine'
export const registerUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim(),
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(8).escape(),
  })
)
export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(8).escape(),
  })
)
