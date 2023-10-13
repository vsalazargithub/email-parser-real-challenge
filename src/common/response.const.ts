export const AppErrors = {
  OK: {
    code: 'RS200',
    message: 'OK',
  },
  BadRequest: {
    code: 'RS400',
    message: 'Solicitud malformada',
  },
  NotFound: {
    code: 'RS404',
    message: 'Recurso no disponible',
  },
  BadGateway: {
    code: 'RS500',
    message: 'Servicio no disponible',
  },
  TimeOut: {
    code: 'RS408',
    message: 'Excedió el tiempo de conexión',
  },
  Unauthorized: {
    code: 'RS401',
    message: 'Acceso no authorizado',
  },
}
