import { Service } from "typedi";

@Service()
class UserService {
  getUser() {
    return { name: "John Doe" };
  }
}

export default UserService;
