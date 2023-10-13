import { Injectable } from '@nestjs/common'
import { IEmailParserRepository } from './upload-email-parser.repository.interface'
import axios from 'axios'
const fs = require('fs')
const EmlParser = require('eml-parser')
@Injectable()
export class EmailParserRepository implements IEmailParserRepository {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async getJSONFromURL(url: string): Promise<any> {
    return (
      await axios.get(url, {
        headers: {
          Accept: '*/*, application/json',
        },
      })
    ).data
  }

  async getJSONFromEML(data: Express.Multer.File): Promise<any> {
    const directoryName: string =
      './uploads/' +
      Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 7).toString(7))
        .join('')

    const attachmentDirectoryPathPromise = await new EmlParser(
      fs.createReadStream('./uploads/' + data.filename),
    )
      .getEmailAttachments()
      .then((attachments) => {
        let attachmentDirectoryPath: string
        attachments.forEach((attachment) => {
          if (!fs.existsSync(directoryName)) {
            fs.mkdirSync(directoryName)
          }

          fs.writeFileSync(
            directoryName + '/' + attachment.filename,
            attachment.content,
            'binary',
            function (err) {
              if (err) {
                console.error(err)
              }
            },
          )
          attachmentDirectoryPath = directoryName + '/' + attachment.filename
          return attachmentDirectoryPath
        })
        return attachmentDirectoryPath
      })

    const attachedJSONLinkPromise = async () => {
      const attachedJSONLinkPromise: string = await new EmlParser(
        fs.createReadStream('./uploads/' + data.filename),
      )
        .parseEml()
        .then((result) => {
          return result.text.trim()
        })
        .catch((err) => {
          console.error(err)
        })
      return attachedJSONLinkPromise
    }
    const attachedJSONLink: string = await attachedJSONLinkPromise()

    if (attachedJSONLink && attachedJSONLink.trim() !== '')
      return (
        await axios.get(attachedJSONLink, {
          headers: {
            Accept: '*/*, application/json',
          },
        })
      ).data
    const jsonPathDir = await attachmentDirectoryPathPromise
    const attachedJSON = fs.readFileSync(jsonPathDir, 'utf8')
    if (attachedJSON) return JSON.parse(attachedJSON)

    return { success: false }
  }
}
