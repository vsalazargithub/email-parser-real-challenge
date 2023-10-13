import { registerAs } from '@nestjs/config'

export default registerAs('config', () => {
  return {
    auth: {
      jwt: {
        publicKey: Buffer.from(process.env.NEST_APP_PUBLIC_KEY, 'base64').toString(),
        privateKey: Buffer.from(process.env.NEST_APP_PRIVATE_KEY, 'base64').toString(),
        expiresIn: process.env.NEST_APP_TOKEN_EXPIRE,
        refresh: {
          expiresIn: process.env.NEST_APP_REFRESH_TOKEN_EXPIRE,
        },
      },
    },
  }
})
