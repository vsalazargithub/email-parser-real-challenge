export interface IEmailParserRepository {
  getJSONFromURL(url: string): Promise<any>
  getJSONFromEML(data: Express.Multer.File): Promise<any>
}
