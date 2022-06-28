import * as Joi from "joi";

/** Contacts **/
export const ContactCreateSchema = Joi.object({
    name: Joi.string().required(),
    countrycode: Joi.string().required(),
    phonenumber: Joi.string().required(),
    email: Joi.string().email().required(),
    company: Joi.string(),
    country: Joi.string(),
    sex: Joi.string(),
    zipcode: Joi.number(),
    param1: Joi.string(),
    param2: Joi.string(),
    param3: Joi.string()
});

/** SMS **/
export const SMSCreateSchema = Joi.object({
    message: Joi.string().max(160),
    countrycode: Joi.string().default('0047'), // 0047
    phonenumber: Joi.string().required(), // 95091819
    date: Joi.string(), //
    time: Joi.string() // 21:30
});

export const SMSCreateBatchSchema = Joi.array().items(SMSCreateSchema);
