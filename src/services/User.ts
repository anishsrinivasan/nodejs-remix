import { Service } from "typedi";
import UserRepository from "../repository/User";
import { User } from "../entity/User";
import { otpType } from "../entity/OtpVerify";
import OtpVerifyService from "../services/OtpVerify";
import { ApiError } from "../core/apiResponse";
import httpStatus from "http-status";

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
      statusMessage = "OTP has been sent successfully, Please Verify!",
      statusCode = httpStatus.OK;

    const user = await this.userRepository.getUser({
      countryCode,
      phoneNumber,
    });

    if (!user) {
      isRegistered = false;
      statusMessage = "Sign up to Continue";
    }

    if (user) {
      await this.otpVerifyService.generateOTP(otpType.phoneNumber, {
        countryCode,
        phoneNumber,
        user,
      });
    }

    return { isRegistered, statusMessage, statusCode };
  }

  async signUpPhoneNumber(userPayload: User) {
    const { countryCode, phoneNumber } = userPayload;

    let user = await this.userRepository.getUser({
      countryCode: userPayload.countryCode,
      phoneNumber: userPayload.phoneNumber,
    });

    if (user) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, "User Already Registered");
    }

    await this.userRepository.createUser(userPayload);

    //@@@ Avoid Getting Data from Repository
    user = await this.userRepository.getUser({
      countryCode: userPayload.countryCode,
      phoneNumber: userPayload.phoneNumber,
    });

    if (user) {
      await this.otpVerifyService.generateOTP(otpType.phoneNumber, {
        countryCode,
        phoneNumber,
        user,
      });
    }

    return;
  }

  async getUser(userId: string) {
    const data = await this.userRepository.getUser({ id: userId });

    if (!data) {
      throw new ApiError(404, "User not found");
    }

    return data;
  }

  async getAll() {
    const data = await this.userRepository.getAll();

    if (data.length < 1) {
      throw new ApiError(404, "Users not found");
    }
    return data;
  }

  async createUser(user: User) {
    return await this.userRepository.createUser(user);
  }

  async updateUser(userId: string, user: User) {
    const currentUser = await this.userRepository.getUser(userId);
    if (!currentUser) {
      throw new ApiError(400, "User Not Found");
    }
    return await this.userRepository.updateUser(userId, user);
  }

  async deleteUser(userId: string) {
    const response = await this.userRepository.deleteUser(userId);
    if (!response.isDeleted) {
      throw new ApiError(404, "User Not Found, Delete Failed");
    }

    return response;
  }
}

export default UserService;
