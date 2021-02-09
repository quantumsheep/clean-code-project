import { model, Schema, Document } from '../db';
import { IModel } from './model.interface';

export interface IBook extends IModel {
  name: string;
  author: string;
}

export const BookSchema = new Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
});

BookSchema.index({
  name: 'text',
  author: 'text',
});

export const BookModel = model<IBook & Document>('book', BookSchema);
