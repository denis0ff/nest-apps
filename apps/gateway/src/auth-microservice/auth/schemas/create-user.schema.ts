import * as Joi from 'joi';
import { CreateUserDto } from '../dto/create-user.dto';

export const CreateUserSchema = Joi.object<CreateUserDto>({
  username: Joi.string().required(),
  password: Joi.string().min(8).required(),
});
