import { Formik, Form, Field } from 'formik';

export function LoginPage() {
    const initialValues = {
        username: '',
        password: '',
    };

    const onSubmit = (values) => {
        console.log(values);
    }

    return (
        <div>
            <h1>Войти</h1>

            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                <Form>
                    <div>
                        <label htmlFor="username">Ваше имя</label>
                        <Field
                            name="username"
                            type="text"
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Пароль</label>
                        <Field
                            name="password"
                            type="password"
                        />
                    </div>

                    <button type="submit">Войти</button>
                </Form>
            </Formik>
        </div>
    );
}
