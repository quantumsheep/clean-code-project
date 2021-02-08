import { v4 as uuidv4 } from "uuid";
import { IUser, UserModel } from "../models/user.model";

export namespace UserService {
  export function get() {
    return UserModel.find();
  }

  export function getByToken(token: string) {
    return UserModel.findOne({ token });
  }

  export function getById(_id: string) {
    return UserModel.findOne({ _id });
  }

  export async function create() {
    const user = await UserModel.create({
      token: uuidv4(),
    });

    return user.toObject({ versionKey: false });
  }

  export async function update(_id: string, data: Partial<Pick<IUser, 'is_librarian'>>) {
    const user = await getById(_id);

    if (user) {
      user.set(data);
    }

    return user?.toObject?.({ versionKey: false });
  }
}
