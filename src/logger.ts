import { createLogger, format, transports } from 'winston'

export default createLogger({
  transports: [
    new transports.File({
      level: 'info',
      maxsize: 1000 * 1000 * 5,
      maxFiles: 5,
      filename: `${__dirname}/../logs/log-api.log`
    }),
    new transports.Console({
      level: 'debug',
    })
  ]
})
