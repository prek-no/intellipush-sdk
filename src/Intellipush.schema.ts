import * as Joi from 'joi';

/** Contacts **/
export const IntellipushConfigSchema = Joi.object({
    clientId: Joi.string().required(),
    clientSecret: Joi.string().required()
});

/** Contacts **/
export const ContactCreateSchema = Joi.object().keys({
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
    param3: Joi.string(),
});

export const ContactUpdateSchema = ContactCreateSchema.keys({
    id: Joi.string().required(),
});

/** Contact List **/
export const ContactListCreateSchema = Joi.object().keys({
    name: Joi.string().required(),
});

export const ContactListUpdateSchema = ContactListCreateSchema.keys({
    id: Joi.string().required(),
});

/** Url shortener **/
export const UrlGenerateSchema = Joi.string().uri().required();
export const UrlDetailsSchema = Joi.number().required();

export const UrlGenerateChildSchema = Joi.object({
    id: Joi.string().required(),
    target: Joi.object().keys({
        contact_id: Joi.number().required(),
        email: Joi.string().email().required(),
        countrycode: Joi.string().required(),
        phonenumber: Joi.string().required(),
    }),
});

/** Two Factor **/
export const Url2FAGenerateSchema = Joi.object({
    countrycode: Joi.string().required(),
    phonenumber: Joi.string().required(),
    message_p1: Joi.string().required(),
    message_p2: Joi.string().required(),
});

export const Url2FAValidateSchema = Joi.object({
    countrycode: Joi.string().required(),
    phonenumber: Joi.string().required(),
    code: Joi.string().required(),
});


/** SMS **/
export const SMSCreateSchema = Joi.object({
    message: Joi.string().max(160),
    countrycode: Joi.string().default('0047'), // 0047
    phonenumber: Joi.string().required(), // 95091819
    date: Joi.string(), //
    time: Joi.string(), // 21:30
});

export const SMSCreateBatchSchema = Joi.array().items(SMSCreateSchema);
