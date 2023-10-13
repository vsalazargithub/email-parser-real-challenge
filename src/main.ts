import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as moment from 'moment-timezone'
import helmet from 'helmet'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor'
import { CommonErrorInterceptor } from 'common/interceptors/common-error.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const port = configService.get<number>('NEST_APP_PORT') || 3000

  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(
    new TimeoutInterceptor(configService.get<number>('NEST_APP_TIME_OUT')),
    new CommonErrorInterceptor(),
  )
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  app.setGlobalPrefix('api/v1')
  app.use(helmet())
  app.enableCors()
  app.enableShutdownHooks()

  moment.tz.setDefault('America/Chicago')

  await app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.debug(`Email parser app runing at port ${port} `)
  })
}
bootstrap()
