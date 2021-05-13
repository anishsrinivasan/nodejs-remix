import { Service, Container } from "typedi";
import { environment } from "../../config";
import logger from "../logger";
import twilio from "../../modules/twilio";
const twilioInstance = Container.get(twilio);

export interface ISMSPayload {
  message: string;
  countryCode: string;
  phoneNumber: string;
}

@Service()
class SMSService {
  async sendSMS(smsPayload: ISMSPayload) {
    try {
      if (environment === "development") {
        return logger.warn(
          `Skipped Sending SMS - ${smsPayload.message} to ${smsPayload.countryCode}${smsPayload.phoneNumber}`
        );
      }

      return await twilioInstance.sendSMS(smsPayload);
    } catch (err) {
      logger.error(err);
    }
  }
}

export default SMSService;
