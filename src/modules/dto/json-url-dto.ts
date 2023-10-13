import { IsNotEmpty, IsString } from 'class-validator'

export class JsonURLDto {
  @IsString()
  @IsNotEmpty()
  url: string
}
