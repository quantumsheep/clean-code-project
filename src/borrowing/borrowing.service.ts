import { BookModel } from "../models/book.model";
import { BorrowingModel } from "../models/borrowing.model";

export namespace BorrowingService {
  export function get() {
    return BorrowingModel.find();
  }

  export function getByUser(userId: string) {
    return BorrowingModel.find({ user: userId });
  }

  export function getByBook(bookId: string) {
    return BorrowingModel.find({ book: bookId });
  }

  export async function borrowCount(userId: string) {
    return await BorrowingModel.count({
      user: userId,
      returned: false,
    });
  }

  export async function isBorrowed(bookId: string) {
    return await BorrowingModel.exists({
      book: bookId,
      returned: false,
    });
  }

  export async function isBorrowedBy(bookId: string, userId: string) {
    return await BorrowingModel.exists({
      user: userId,
      book: bookId,
      returned: false,
    });
  }

  export async function borrowBook(userId: string, bookId: string) {
    const borrowing = await BorrowingModel.create({
      user: userId,
      book: bookId,
    });

    return borrowing.toObject({ versionKey: false });
  }

  export async function returnBook(userId: string, bookId: string) {
    const borrowing = await BorrowingModel.findOne({
      user: userId,
      book: bookId,
    });

    if (borrowing) {
      await borrowing.set({
        returned: true,
        returned_date: new Date(),
      }).save();
    }

    return borrowing?.toObject?.({ versionKey: false });
  }
}
