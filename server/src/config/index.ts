import * as dotenv from 'dotenv'
import z from 'zod'
import logger from './logger';

dotenv.config({
    path: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod' ? '.env' : '.env.dev'
});

logger.info(`Environment: ${process.env.NODE_ENV}`);
logger.info(`Database URL: ${process.env.DATABASE_URL}`);

const _env = Object.freeze(z.object({
    NODE_ENV: z.enum(['dev', 'test', 'prod', 'production',"development"]).default('dev'),
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string(),
    JWT_REFRESH_SECRET: z.string(),
    JWT_REFRESH_EXPIRES_IN: z.string(),
    MAIL_MAILER: z.string(),
    MAIL_HOST: z.string(),
    MAIL_PORT: z.string(),
    MAIL_USERNAME: z.string(),
    MAIL_PASSWORD: z.string(),
    MAIL_ENCRYPTION: z.string(),
    FRONTEND_URL: z.string(),
}).parse(process.env));

export default _env
