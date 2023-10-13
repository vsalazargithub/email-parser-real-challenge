import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { QueryFailedError } from 'typeorm'

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    response.status(400).json({
      statusCode: 400,
      message: 'Bad request',
    })
  }
}
