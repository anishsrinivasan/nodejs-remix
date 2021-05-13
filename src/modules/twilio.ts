import twilio from "twilio";
import { Service } from "typedi";
import { ISMSPayload } from "../core/sms";
import { configValidator } from "../helpers";
import { TWILIO } from "./../config";
import logger from "../core/logger";

let client: any;
let isServiceValid = true;

// SERVICE VALIDATION
if (TWILIO.MESSAGING_SERVICE) {
  const { isValid, errors } = configValidator(TWILIO, [
    "accountSid",
    "authToken",
    "messagingServiceSid",
  ]);

  isServiceValid = isValid;
  if (isValid) {
    client = twilio(TWILIO.accountSid, TWILIO.authToken);
  } else {
    logger.error(`INIT TWILIO - ${errors} - Missing Credentials`);
  }
}
// SERVICE VALIDATION

@Service()
class Twilio {
  async sendSMS({ message, countryCode, phoneNumber }: ISMSPayload) {
    const to = countryCode + phoneNumber;
    const twilioPayload = {
      body: message,
      messagingServiceSid: TWILIO.messagingServiceSid,
      to,
    };

    if (!TWILIO.MESSAGING_SERVICE) {
      logger.error(
        `TWILIO MESSAGING SERVICE DISABLED IN .env, Cannot Send SMS`
      );
      return;
    }

    if (!isServiceValid) {
      logger.error(`TWILIO CREDENTIALS MISSING, Cannot Send SMS`);
      return;
    }

    const response = await client.messages.create(twilioPayload);
    return response;
  }
}

export default Twilio;
