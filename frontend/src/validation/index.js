import * as Yup from "yup";
import i18n from '../i18n.js';

export const validateChannelName = (channels) =>
    Yup.object({
        name: Yup.string()
            .trim()
            .min(3, i18n.t('errors.rangeLetter'))
            .max(20, i18n.t('errors.rangeLetter'))
            .required(i18n.t('errors.required'))
            .notOneOf(
                channels.map((c) => c.name),
                i18n.t('errors.notOneOf')
            ),
    });

export const signupSchema = Yup.object({
    username: Yup.string()
        .trim()
        .min(3, i18n.t('errors.rangeLetter'))
        .max(20, i18n.t('errors.rangeLetter'))
        .required(i18n.t('errors.required')),

    password: Yup.string()
        .min(6, i18n.t('errors.minLetter'))
        .required(i18n.t('errors.required')),

    passwordRepeat: Yup.string()
        .oneOf([Yup.ref('password')], i18n.t('errors.checkPassword'))
        .required(i18n.t('errors.required')),
});
