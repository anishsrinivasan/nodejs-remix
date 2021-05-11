import { Service } from "typedi";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

@Service()
class UserRepository {
  async getUser(id: string) {
    const response = await getRepository(User).findOne({ where: { id } });
    return response;
  }
  async getAll() {
    const response = await getRepository(User).find();
    return response;
  }

  async createUser(user: User) {
    const response = await getRepository(User).insert(user);
    const insertId = response.raw.insertId;
    return { ...user, insertId };
  }
}

export default UserRepository;
