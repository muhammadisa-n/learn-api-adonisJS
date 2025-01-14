import Contact from '#models/contact'
import { ResponseService } from '#services/response_service'
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
      return ResponseService.notFound(response, 'Contact Not Found')
    }
    return ResponseService.success(response, 'Get All Contacts', contacts)
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
    return ResponseService.created(response, 'Create Contact Success', contact)
  }

  /**
   * Show individual record
   */
  async show({ params, response, auth }: HttpContext) {
    const userId = Number(auth.user?.id)
    const contact = await Contact.query().where('id', params.id).andWhere('user_id', userId).first()
    if (!contact) {
      return ResponseService.notFound(response, 'Contact Not Found')
    }
    return ResponseService.success(response, 'Get Detail Contact', contact)
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
      return ResponseService.notFound(response, 'Contact Not Found')
    }
    contact.merge(validatedData)
    await contact.save()
    return ResponseService.success(response, 'Update Contact Updated', contact)
  }

  /**
   * Delete record
   */
  async destroy({ params, response, auth }: HttpContext) {
    const userId = Number(auth.user?.id)
    const contact = await Contact.query().where('id', params.id).andWhere('user_id', userId).first()
    if (!contact) {
      return ResponseService.notFound(response, 'Contact Not Found')
    }
    await contact.delete()
    return ResponseService.success(response, 'Delete Contact Success')
  }
}
