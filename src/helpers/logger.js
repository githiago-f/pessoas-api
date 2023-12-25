import winston from "winston";
const { printf, combine, timestamp } = winston.format;

const formatter = printf((data) => {
  return `${data.timestamp} [${data.service}] ${data.level}: ${data.message}`;
});

export const Logger = (service = 'index') => winston.createLogger({
  defaultMeta: { service },
  format: combine(timestamp(), formatter),
  transports: [
    new winston.transports.Console()
  ]
});
