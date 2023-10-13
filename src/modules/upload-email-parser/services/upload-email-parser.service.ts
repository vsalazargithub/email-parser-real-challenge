import { Inject, Injectable } from '@nestjs/common'
import { IEmailParserService } from './upload-email-parser.service.interface'
import { IEmailParserRepository } from '../repositories/upload-email-parser.repository.interface'
import { JsonURLDto } from 'modules/dto/json-url-dto'

@Injectable()
export class EmailParserService implements IEmailParserService {
  constructor(
    @Inject('IEmailParserRepository')
    public readonly emailParserRepository: IEmailParserRepository,
  ) {}

  async getJSONFromEML(data: Express.Multer.File): Promise<any> {
    return this.emailParserRepository.getJSONFromEML(data)
  }

  async getJSONFromURL(dto: JsonURLDto): Promise<any> {
    return this.emailParserRepository.getJSONFromURL(dto.url)
  }
}
