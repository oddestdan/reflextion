import mongoose = require('mongoose');
import bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export interface IUserModel extends mongoose.Document {
  comparePassword(password: string);
  email: string;
  password: string;
}

UserSchema.pre<IUserModel>('save', async function (next) {
  const saltRounds = Number(process.env.SALT_ROUNDS);
  const user = this;
  if (!user.isModified()) {
    return next();
  }

  try {
    user.password = await bcrypt.hash(user.password, saltRounds);
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.comparePassword = async function comparePassword(candidate) {
  const user = this as IUserModel;
  return bcrypt.compare(candidate, user.password);
};

export const UserModel = mongoose.model<IUserModel>('User', UserSchema);
