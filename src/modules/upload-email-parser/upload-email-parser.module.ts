import { Module } from '@nestjs/common'
import { EmailParserController } from './upload-email-parser.controller'
import { EmailParserService } from './services/upload-email-parser.service'
import { EmailParserRepository } from './repositories/upload-email-parser.repository'

@Module({
  providers: [
    {
      provide: 'IEmailParserService',
      useClass: EmailParserService,
    },
    {
      provide: 'IEmailParserRepository',
      useClass: EmailParserRepository,
    },
  ],
  controllers: [EmailParserController],
})
export class EmailParserModule {}
