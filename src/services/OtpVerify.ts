import { Service } from "typedi";
import OtpVerifyRepository from "../repository/OtpVerify";
import { otpStatus, otpVerify, otpType } from "../entity/OtpVerify";
import { User } from "../entity/User";

import { getMinutesBetweenDates, otpGenerator } from "../helpers";
import SMSService from "../core/sms";

@Service()
class OtpVerifyService {
  constructor(
    private readonly otpVerifyRepository: OtpVerifyRepository,
    private readonly smsServiceInstance: SMSService
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
      user: User | undefined;
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
    let statusMessage = "OTP has been re-sent Successfully",
      statusCode = 200;

    const otpVerify = await this.otpVerifyRepository.verifyOTP({
      otpVerifyId,
    });

    if (!otpVerify) {
      statusCode = 401;
      statusMessage = "Verification Code is Incorrect";
      return { statusMessage, statusCode };
    }

    if (otpVerify?.resend_attempts > 3) {
      await this.otpVerifyRepository.updateVerifyOTP(otpVerify.id, {
        status: otpStatus.TOO_MANY_ATTEMPTS,
      });
      statusCode = 429;
      statusMessage = "Too Many Attempts, Please try Later.";
      return { statusMessage, statusCode };
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

    return { statusCode, statusMessage };
  }

  async otpVerify({ otpVerifyId, otpVerifyCode }: otpVerify) {
    let statusMessage = "OTP Verified Successfully",
      statusCode = 200;

    const otpVerify = await this.otpVerifyRepository.verifyOTP({
      otpVerifyId,
      otpVerifyCode,
    });

    if (!otpVerify) {
      statusCode = 401;
      statusMessage = "Verification Code is Incorrect";
      return { statusMessage, statusCode };
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
          statusCode = 410;
          statusMessage = "OTP Expired, Please Try Again";
          return { statusMessage, statusCode };
        }

        break;
      }

      case otpStatus.SUCCESS: {
        statusCode = 401;
        statusMessage = "OTP Verification Failed, Please Try Again";
        return { statusMessage, statusCode };
      }

      case otpStatus.TOO_MANY_ATTEMPTS: {
        statusCode = 429;
        statusMessage = "Too Many Requests, Please try Later.";
        return { statusMessage, statusCode };
      }
    }

    await this.otpVerifyRepository.updateVerifyOTP(otpVerify.id, {
      status: otpStatus.SUCCESS,
    });

    // @@@ Handle JWT Token
    return { statusMessage, statusCode };
  }
}

export default OtpVerifyService;
