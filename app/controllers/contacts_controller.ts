import Contact from '#models/contact'
import { createContact, updateContact } from '#validators/contact'
import type { HttpContext } from '@adonisjs/core/http'

export default class ContactsController {
  /**
   * Display a list of resource
   */
  async index({ response, auth }: HttpContext) {
    const userId = Number(auth.user?.id)
    const contacts = await Contact.findManyBy('user_id', userId)
    if (!contacts) {
      response.notFound({
        message: 'Contact Not Found',
        data: null,
      })
    }
    return response.ok({
      message: 'Get All Contact Success',
      data: contacts,
    })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    const data = request.all()
    const validatedData = await createContact.validate(data)
    const contact = await Contact.create(validatedData)
    contact.userId = Number(auth.user?.id)
    contact.save()
    return response.created({
      message: 'Create Contact Success',
      status_code: 201,
      data: contact,
    })
  }

  /**
   * Show individual record
   */
  async show({ params, response, auth }: HttpContext) {
    const userId = Number(auth.user?.id)
    const contact = await Contact.query().where('id', params.id).andWhere('user_id', userId).first()
    if (!contact) {
      response.notFound({
        message: 'Contact Not Found',
        data: null,
      })
    }
    return response.ok({
      message: 'success',
      data: contact,
    })
  }
  /**
   * Edit individual record
   */
  async edit({}: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, auth }: HttpContext) {
    const data = request.all()
    const userId = Number(auth.user?.id)
    const validatedData = await updateContact.validate(data)
    const contact = await Contact.query().where('id', params.id).andWhere('user_id', userId).first()
    if (!contact) {
      return response.notFound({
        message: 'Contact Not Found',
        data: null,
      })
    }
    contact.merge(validatedData)
    await contact.save()
    return response.ok({
      message: 'success',
      data: contact,
    })
  }

  /**
   * Delete record
   */
  async destroy({ params, response, auth }: HttpContext) {
    const userId = Number(auth.user?.id)
    const contact = await Contact.query().where('id', params.id).andWhere('user_id', userId).first()
    if (!contact) {
      return response.notFound({
        message: 'Contact Not Found',
        data: null,
      })
    }
    await contact.delete()
    return response.ok({
      message: 'success',
    })
  }
}
