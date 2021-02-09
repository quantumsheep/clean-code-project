import { model, Schema, Document } from '../db';
import { BookModel } from './book.model';
import { IModel } from './model.interface';
import { UserModel } from './user.model';

export interface IBorrowing extends IModel {
  book: string;
  user: string;

  borrowed_date: Date;

  returned: boolean;
  returned_date?: Date;
}

export const BorrowingSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: BookModel.name, required: true },
  user: { type: Schema.Types.ObjectId, ref: UserModel.name, required: true },
  borrowed_date: { type: Date, default: Date.now },
  returned: { type: Boolean, default: false },
  returned_date: { type: Date },
});

export const BorrowingModel = model<IBorrowing & Document>('borrowing', BorrowingSchema);
