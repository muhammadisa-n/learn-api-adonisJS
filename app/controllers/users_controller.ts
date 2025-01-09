import User from '#models/user'
import { registerUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  public async register({ request, response }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password'])
    const validatedData = await registerUserValidator.validate(data)
    const userExits = await User.findBy('email', validatedData['email'])
    if (userExits) {
      return response.status(400).json({
        message: 'Email Sudah Terdaftar',
        status: 400,
      })
    }
    User.create(validatedData)
    return response.ok({
      message: 'Register Berhasil',
      status: 200,
    })
  }
}
