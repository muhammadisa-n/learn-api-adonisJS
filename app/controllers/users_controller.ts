import User from '#models/user'
import { loginUserValidator, registerUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import db from '@adonisjs/lucid/services/db'

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

  public async login({ request, response }: HttpContext) {
    const data = request.only(['email', 'password'])
    const { email, password } = await loginUserValidator.validate(data)
    const user = await User.findBy('email', email)
    if (!user) {
      return response.unauthorized({ message: 'Invalid Email' })
    }

    const passwordIsValid = await hash.verify(user.password, password)
    if (!passwordIsValid) {
      return response.unauthorized({ message: 'Invalid Password' })
    }
    const token = await User.accessTokens.create(user)
    return response.ok({
      message: 'Login Success',
      status_code: 200,
      token: token,
      exp: token.expiresAt,
    })
  }
  public async get({ auth, response }: HttpContext) {
    const user = auth.user
    return response.ok({
      message: 'Success',
      status_code: '200',
      data: user,
    })
  }
  public async logout({ auth, response }: HttpContext) {
    const userId = auth.user?.id
    const user = await User.findOrFail(userId)
    await User.accessTokens.delete(user, user.id)
    await db.from('auth_access_tokens').where('tokenable_id', user.id).delete()
    return response.ok({
      message: 'Success',
      status_code: '200',
    })
  }
}
