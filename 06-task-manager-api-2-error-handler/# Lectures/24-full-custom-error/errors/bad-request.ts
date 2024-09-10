import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-api'

class BadRequestError extends CustomAPIError {
  statusCode: StatusCodes

  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
    this.name = 'Bad Request Error'
  }
}

export default BadRequestError
