import { Service } from "typedi";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { OtpVerification } from "../entity/OtpVerify";

@Service()
class UserRepository {
  async getUser(user: any): Promise<User | undefined> {
    const response = await getRepository(User).findOne({ where: user });
    return response;
  }
  async getAll(): Promise<User[] | []> {
    const response = await getRepository(User).find();
    return response;
  }

  async createUser(user: User) {
    const response = await getRepository(User).insert(user);
    const insertId = response.raw.insertId;
    return { ...user, insertId };
  }

  async updateUser(userId: string | number, user: Partial<User>): Promise<{}> {
    const response = await getRepository(User).update(userId, user);
    const insertId = response.raw.insertId;
    return { ...user, insertId };
  }

  async deleteUser(userId: string): Promise<{ isDeleted: boolean }> {
    const response = await getRepository(User).softDelete(userId);
    const isDeleted = response.raw.changedRows > 0 ? true : false;
    return { isDeleted };
  }
}

export default UserRepository;
