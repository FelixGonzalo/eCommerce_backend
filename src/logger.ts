import { createLogger, format, transports } from 'winston'
console.log('__dirname', __dirname)
export default createLogger({
  transports: [
    new transports.File({
      level: 'info',
      maxsize: 1000 * 1000 * 5,
      maxFiles: 5,
      filename: `./logs/log-${
        process.argv[2].split('=')[1] || 'development'
      }.log`,
    }),
    new transports.Console({
      level: 'debug',
    }),
  ],
})
