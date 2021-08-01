import * as mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export interface User extends mongoose.Document {
  comparePassword(password: string);
  email: string;
  password: string;
}

UserSchema.pre<User>('save', async function (next) {
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
  const user = this as User;
  return bcrypt.compare(candidate, user.password);
};

export const UserModel = mongoose.model<User>('User', UserSchema);
