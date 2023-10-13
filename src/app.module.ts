import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import config from './config'
import { enviroments } from './enviroments'
import { EmailParserModule } from 'modules/upload-email-parser/upload-email-parser.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        NEST_APP_TIME_OUT: Joi.number().required(),
        NEST_APP_PORT: Joi.number().required(),
      }),
    }),
    EmailParserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
