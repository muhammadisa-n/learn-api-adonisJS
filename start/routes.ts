/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('auth/register', [UsersController, 'register'])
    router.post('auth/login', [UsersController, 'login'])
    router
      .group(() => {
        router.post('auth/logout', [UsersController, 'logout'])
        router.get('users/current', [UsersController, 'get'])
      })
      .use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('api')
