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
const ContactsController = () => import('#controllers/contacts_controller')

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
        router.get('auth/users/current', [UsersController, 'get'])
        router.resource('/contacts', ContactsController).except(['edit', 'create'])
      })
      .use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('api')
