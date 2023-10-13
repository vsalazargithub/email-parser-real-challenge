import { Controller, Post, UploadedFile, UseInterceptors, Inject, Body } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { EmailParserService } from './services/upload-email-parser.service'
import { JsonURLDto } from 'modules/dto/json-url-dto'

@Controller('email')
export class EmailParserController {
  constructor(
    @Inject('IEmailParserService')
    public readonly emailParserService: EmailParserService,
  ) {}

  @Post('/parse-eml')
  @UseInterceptors(
    FileInterceptor('data', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('')
          cb(null, `${randomName}${file.originalname}`)
        },
      }),
    }),
  )
  async getJSONFromEML(@UploadedFile() data: Express.Multer.File): Promise<any> {
    return this.emailParserService.getJSONFromEML(data)
  }

  @Post('/parse-url')
  async getJSONFromURL(@Body() jsonURLDto: JsonURLDto): Promise<any> {
    return this.emailParserService.getJSONFromURL(jsonURLDto)
  }
}
