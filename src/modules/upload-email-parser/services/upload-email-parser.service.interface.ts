import { JsonURLDto } from 'modules/dto/json-url-dto'

export interface IEmailParserService {
  getJSONFromURL(jsonURLDto: JsonURLDto): Promise<any>
  getJSONFromEML(data: Express.Multer.File): Promise<any>
}
