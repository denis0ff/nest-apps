import * as Joi from 'joi';
import { AppConfig } from './types';
import * as process from 'process';

export const appConfig = (): AppConfig => {
  const schema = Joi.object<AppConfig>({
    accessJWTSecret: Joi.string().required(),
    refreshJWTSecret: Joi.string().required(),
    accessJWTExpiresIn: Joi.string().required(),
    refreshJWTExpiresIn: Joi.string().required(),
    port: Joi.number().integer().greater(10).less(65535).required(),
  });

  const { error, value } = schema.validate({
    accessJWTSecret: process.env.ACCESS_JWT_SECRET,
    refreshJWTSecret: process.env.REFRESH_JWT_SECRET,
    accessJWTExpiresIn: process.env.ACCESS_JWT_EXPIRES_IN,
    refreshJWTExpiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
    port: parseInt(process.env.PORT, 10),
  });

  if (error) {
    throw new Error(`Invalid app configuration: ${error.message}`);
  }

  return value;
};
