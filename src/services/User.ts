import { Service } from "typedi";
import UserRepository from "../repository/User";
import { User } from "../entity/User";
import { otpType } from "../entity/OtpVerify";
import OtpVerifyService from "../services/OtpVerify";

@Service()
class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly otpVerifyService: OtpVerifyService
  ) {}

  async signInPhoneNumber({
    countryCode,
    phoneNumber,
  }: {
    countryCode: string;
    phoneNumber: string;
  }) {
    let isRegistered = true,
      statusMessage = "Please check the OTP",
      statusCode = 200;

    const user = await this.userRepository.getUser({
      countryCode,
      phoneNumber,
    });

    if (!user) {
      isRegistered = false;
      statusMessage = "Sign up to Continue";
    }

    await this.otpVerifyService.generateOTP(otpType.phoneNumber, {
      countryCode,
      phoneNumber,
      user,
    });
    return { isRegistered, statusMessage, statusCode };
  }

  async getUser(userId: string) {
    return await this.userRepository.getUser({ id: userId });
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
