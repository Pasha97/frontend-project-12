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