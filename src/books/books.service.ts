import { IBook, BookModel } from "../models/book.model";

export namespace BooksService {
  export function get() {
    return BookModel.find();
  }

  export function search(search: string = '') {
    if (!search) {
      return BookModel.find();
    }

    return BookModel.find({
      $text: {
        $search: search,
      },
    });
  }

  export function getById(_id: string) {
    return BookModel.findOne({ _id });
  }

  export async function create(data: Pick<IBook, 'name' | 'author'>) {
    const book = await BookModel.create(data);
    return book.toObject({ versionKey: false });
  }

  export async function update(_id: string, data: Partial<Pick<IBook, 'name' | 'author'>>) {
    const book = await getById(_id);

    if (book) {
      await book.set(data).save();
    }

    return book?.toObject?.({ versionKey: false });
  }
}
