import winston from 'winston';
import path from 'path';

const logDirectory = 'logs';
const logFile = 'app.log';
const serviceName = 'account-service';

winston.addColors({
  error: 'red bold',
  warn: 'yellow',
  info: 'green',
  debug: 'cyan',
});

const logger = winston.createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  level: 'debug',
  format: winston.format.combine(
    winston.format.label({ label: serviceName }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, label, ...meta }) => {
      let metaStr = '';
      if (Object.keys(meta).length) {
        metaStr = JSON.stringify(meta, null, 2); // Prettify JSON
      }
      return `[${timestamp}] [${label}] ${level}: ${message} ${metaStr}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logDirectory, logFile),
      level: 'info',
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.printf(({ timestamp, level, message, label, ...meta }) => {
          let metaStr = '';
          if (Object.keys(meta).length) {
            metaStr = JSON.stringify(meta, null, 2); // Prettified JSON
          }
          return `[${timestamp}] [${label}] ${level}: ${message}\n${metaStr}`;
        })
      ),
    }),
  ],
});

export default logger;