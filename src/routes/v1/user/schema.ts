import Joi from "joi";

const signInUserPhoneNumber = {
  body: Joi.object().keys({
    countryCode: Joi.string().required(),
    phoneNumber: Joi.string().required(),
  }),
};

const signUpUserPhoneNumber = {
  body: Joi.object().keys({
    countryCode: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    displayName: Joi.string().required(),
    email: Joi.string()
      .email()
      .required()
      .messages({ "string.any": "Enter a Valid Email" }),
  }),
};

const resendOTP = {
  body: Joi.object().keys({
    otpVerifyId: Joi.string().required(),
  }),
};

const otpVerify = {
  body: Joi.object().keys({
    otpVerifyId: Joi.string().required(),
    otpVerifyCode: Joi.string().required(),
  }),
};
const createUser = {
  body: Joi.object().keys({
    displayName: Joi.string().required(),
    email: Joi.string()
      .email()
      .required()
      .messages({ "string.any": "Enter a Valid Email" }),
    countryCode: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    imgURL: Joi.string().allow("", null),
    password: Joi.string().allow(null, ""),
  }),
};

const createUserWithEmail = {
  body: Joi.object().keys({
    displayName: Joi.string().required(),
    email: Joi.string().email().required(),
    countryCode: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    imgURL: Joi.string().allow("", null),
    password: Joi.string().required(),
  }),
};

const updateUser = {
  body: Joi.object().keys({
    displayName: Joi.string().required(),
    email: Joi.string().email().required(),
    countryCode: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    imgURL: Joi.string().allow("", null),
    password: Joi.string().allow("", null),
  }),
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

const sendResetPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const verifyResetPassword = {
  body: Joi.object().keys({
    otpVerifyId: Joi.string().required(),
    otpVerifyCode: Joi.string().required(),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    otpVerifyId: Joi.string().required(),
    otpVerifyCode: Joi.string().required(),
    new_password: Joi.string().required(),
  }),
};

const deleteUser = {
  body: Joi.object().keys({}),
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

export default {
  signInUserPhoneNumber,
  signUpUserPhoneNumber,
  createUser,
  createUserWithEmail,
  updateUser,
  sendResetPassword,
  verifyResetPassword,
  resetPassword,
  deleteUser,
  otpVerify,
  resendOTP,
};
