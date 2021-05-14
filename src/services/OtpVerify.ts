import { Service } from "typedi";
import UserRepository from "../repository/User";

import OtpVerifyRepository from "../repository/OtpVerify";
import { otpStatus, otpVerify, otpType } from "../entity/OtpVerify";
import { User } from "../entity/User";

import { ApiError } from "../core/apiResponse";

import { getMinutesBetweenDates, otpGenerator } from "../helpers";
import SMSService from "../core/sms";
import JWT from "../core/jwt";
import httpStatus from "http-status";

@Service()
class OtpVerifyService {
  constructor(
    private readonly otpVerifyRepository: OtpVerifyRepository,
    private readonly smsServiceInstance: SMSService,
    private readonly userRepository: UserRepository
  ) {}

  async generateOTP(
    type: otpType = otpType.phoneNumber,
    {
      countryCode = "+91",
      phoneNumber = "",
      email = undefined,
      user,
    }: {
      countryCode?: string;
      phoneNumber?: string;
      email?: string;
      user: User;
    }
  ) {
    const otpVerifyId = otpGenerator.generate(16, {
      upperCase: false,
      digits: true,
      alphabets: true,
    });
    const otpVerifyCode = otpGenerator.generate(6, {
      digits: true,
      upperCase: false,
      alphabets: false,
      specialChars: false,
    });

    const otpVerify = {
      otpVerifyId,
      otpVerifyCode,
      type,
      user,
      countryCode,
      phoneNumber,
      email,
    };

    await this.otpVerifyRepository.createOtp(otpVerify);

    if (type === otpType.phoneNumber) {
      const message = `OTP is ${otpVerifyCode}`;
      this.smsServiceInstance.sendSMS({ message, countryCode, phoneNumber });
    }

    return { otpVerifyId, otpVerifyCode };
  }

  async resendOTP({ otpVerifyId }: { otpVerifyId: string }) {
    const otpVerify = await this.otpVerifyRepository.verifyOTP({
      otpVerifyId,
    });

    if (!otpVerify) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Verification ID is Incorrect"
      );
    }

    if (otpVerify?.resend_attempts > 3) {
      await this.otpVerifyRepository.updateVerifyOTP(otpVerify.id, {
        status: otpStatus.TOO_MANY_ATTEMPTS,
      });
      throw new ApiError(
        httpStatus.TOO_MANY_REQUESTS,
        "Too Many Attempts, Please try Later."
      );
    }

    if (otpVerify.type === otpType.phoneNumber) {
      const countryCode = otpVerify.countryCode;
      const phoneNumber = otpVerify.phoneNumber;

      const message = `OTP is ${otpVerify.otpVerifyCode}`;
      this.smsServiceInstance.sendSMS({ message, countryCode, phoneNumber });
    }

    await this.otpVerifyRepository.updateVerifyOTP(otpVerify.id, {
      resend_attempts: otpVerify.resend_attempts + 1,
    });

    return;
  }

  async otpVerify({ otpVerifyId, otpVerifyCode }: otpVerify) {
    const otpVerify = await this.otpVerifyRepository.verifyOTP({
      otpVerifyId,
      otpVerifyCode,
    });

    if (!otpVerify) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Verification Code is Incorrect"
      );
    }

    await this.otpVerifyRepository.updateVerifyOTP(otpVerify.id, {
      verify_attempts: otpVerify.verify_attempts + 1,
    });

    switch (otpVerify?.status) {
      case otpStatus.PENDING: {
        const diffMinutes = getMinutesBetweenDates(
          new Date(otpVerify.createdAt),
          new Date()
        );

        // EXPIRE IF MORE THAN 30 MINUTES
        if (diffMinutes >= 30) {
          throw new ApiError(httpStatus.GONE, "OTP Expired, Please Try Again");
        }

        break;
      }

      case otpStatus.SUCCESS: {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "OTP Verification Failed, Please Try Again"
        );
      }

      case otpStatus.TOO_MANY_ATTEMPTS: {
        throw new ApiError(
          httpStatus.TOO_MANY_REQUESTS,
          "Too Many Attemps, Please try Later."
        );
      }
    }

    await this.userRepository.updateUser(otpVerify.user.id, {
      isPhoneNumberVerified: true,
    });

    const { id, displayName, email, phoneNumber, imageURL } = otpVerify.user;
    const jwtPayload = { id, displayName, email, phoneNumber, imageURL };
    const token = await JWT.sign(jwtPayload, 6000);

    await this.otpVerifyRepository.updateVerifyOTP(otpVerify.id, {
      status: otpStatus.SUCCESS,
    });

    return { token };
  }
}

export default OtpVerifyService;
