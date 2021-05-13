import { Service } from "typedi";
import { getRepository } from "typeorm";
import { OtpVerification } from "../entity/OtpVerify";

@Service()
class OtpVerifyRepository {
  async createOtp(otpVerify: Partial<OtpVerification>) {
    const response = await getRepository(OtpVerification).insert(otpVerify);
    const insertId = response.raw.insertId;
    return { ...otpVerify, insertId };
  }

  async verifyOTP(otpVerify: Partial<OtpVerification>) {
    const response = await getRepository(OtpVerification).findOne({
      where: otpVerify,
      relations: ["user"],
    });
    return response;
  }

  async updateVerifyOTP(id: number, otpVerify: Partial<OtpVerification>) {
    const response = await getRepository(OtpVerification).update(id, otpVerify);
    return response;
  }
}

export default OtpVerifyRepository;
