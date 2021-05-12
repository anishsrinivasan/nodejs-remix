import { Service } from "typedi";
import UserRepository from "../repository/User";
import { User } from "../entity/User";

@Service()
class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getUser(userId: string) {
    return await this.userRepository.getUser(userId);
  }

  async getAll() {
    return await this.userRepository.getAll();
  }

  async createUser(user: User) {
    return await this.userRepository.createUser(user);
  }

  async updateUser(userId: string, user: User) {
    const currentUser = await this.userRepository.getUser(userId);
    if (!currentUser) {
      throw { code: 400, message: "User Not Found" };
    }
    return await this.userRepository.updateUser(userId, user);
  }

  async deleteUser(userId: string) {
    return await this.userRepository.deleteUser(userId);
  }
}

export default UserService;
