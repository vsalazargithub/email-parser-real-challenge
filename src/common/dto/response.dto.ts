import { ResultDto } from './result.dto'

export class ResponseDto<Type> {
  constructor(public result: ResultDto, public data?: Type) {}
}
