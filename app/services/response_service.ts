export class ResponseService {
  static success(response: any, message: string, data: any = null) {
    return response.status(200).json({
      status: 'success',
      message,
      data,
    })
  }
  static created(response: any, message: string, data: any = null) {
    return response.status(200).json({
      status: 'success',
      message,
      data,
    })
  }

  static error(response: any, message: string, error: any = null) {
    return response.status(500).json({
      status: 'error',
      message,
      error,
    })
  }

  static notFound(response: any, message: string) {
    return response.status(404).json({
      status: 'error',
      message,
    })
  }
}
