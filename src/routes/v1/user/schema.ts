import Joi from "joi";

const signInUserPhoneNumber = {
  body: Joi.object().keys({
    country_code: Joi.string().required(),
    phone_number: Joi.string().required(),
  }),
};

const createUser = {
  body: Joi.object().keys({
    display_name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required()
      .messages({ "string.any": "Enter a Valid Email" }),
    country_code: Joi.string().required(),
    phone_number: Joi.string().required(),
    img_url: Joi.string().allow("", null),
    password: Joi.string().allow(null, ""),
  }),
};

const createUserWithEmail = {
  body: Joi.object().keys({
    display_name: Joi.string().required(),
    email: Joi.string().email().required(),
    country_code: Joi.string().required(),
    phone_number: Joi.string().required(),
    img_url: Joi.string().allow("", null),
    password: Joi.string().required(),
  }),
};

const updateUser = {
  body: Joi.object().keys({
    display_name: Joi.string().required(),
    email: Joi.string().email().required(),
    country_code: Joi.string().required(),
    phone_number: Joi.string().required(),
    img_url: Joi.string().allow("", null),
    password: Joi.string().allow("", null),
  }),
};

const updateUserWithId = {
  body: Joi.object().keys({
    display_name: Joi.string().required(),
    email: Joi.string().email().required(),
    country_code: Joi.string().required(),
    phone_number: Joi.string().required(),
    img_url: Joi.string().allow("", null),
    password: Joi.string().allow("", null),
  }),
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const sendResetPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const verifyResetPassword = {
  body: Joi.object().keys({
    otp_verification_id: Joi.string().required(),
    otp_verify_code: Joi.string().required(),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    otp_verification_id: Joi.string().required(),
    otp_verify_code: Joi.string().required(),
    new_password: Joi.string().required(),
  }),
};

export default {
  signInUserPhoneNumber,
  createUser,
  createUserWithEmail,
  updateUser,
  updateUserWithId,
  sendResetPassword,
  verifyResetPassword,
  resetPassword,
};
