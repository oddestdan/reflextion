import { Request as ExpressRequest } from 'express';
import * as mongoose from 'mongoose';

export interface UserDTO {
  _id: mongoose.ObjectId;
  email: string;
}

export interface Request extends ExpressRequest {
  user: UserDTO;
}
