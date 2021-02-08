import { model, Schema, Document } from '../db';
import { IModel } from './model.interface';

export interface IUser extends IModel {
  token: string;
  is_librarian: boolean;
  created_date: Date;
}

export const UserSchema = new Schema({
  token: { type: String, required: true },
  is_librarian: { type: Boolean, default: false },
  created_date: { type: Date, default: Date.now },
});

export const UserModel = model<IUser & Document>('user', UserSchema);
