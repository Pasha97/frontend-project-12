import * as Yup from "yup";

export const validateChannelName = (channels) =>
    Yup.object({
        name: Yup.string()
            .trim()
            .min(3, 'От 3 символов')
            .max(20, 'До 20 символов')
            .required('Обязательное поле')
            .notOneOf(
                channels.map((c) => c.name),
                'Канал с таким именем уже существует'
            ),
    });

export const signupSchema = Yup.object({
    username: Yup.string()
        .trim()
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .required('Обязательное поле'),

    password: Yup.string()
        .min(6, 'Не менее 6 символов')
        .required('Обязательное поле'),

    passwordRepeat: Yup.string()
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
        .required('Обязательное поле'),
});