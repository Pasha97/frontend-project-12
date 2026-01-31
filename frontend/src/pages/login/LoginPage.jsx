import { Formik, Form, Field } from 'formik';
import { Alert, Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { login } from "../../services/api/auth.js";
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, setToken } from "../../services/storage/auth.js";
import classNames from "classnames";


export function LoginPage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/', { replace: true });
        }
    }, [navigate]);


    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getFieldClasses = (error)  => {
        return classNames('form-control', {
            'is-invalid': Boolean(error),
        });
    }

    const initialValues = {
        username: '',
        password: '',
    };

    const onSubmit = async (values) => {
        if (isLoading) {
            return;
        }

        setLoading(true);
        setError('');

        console.log(values);

        try {
            const { data } = await login(values);
            setToken(data.token);
            navigate('/', { replace: true });
        } catch (e) {
            if (e.response.status === 401) {
                setError('Неверные имя пользователя или пароль');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="row justify-content-center align-content-center h-100">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                className="col-12 col-md-6 mt-3 mt-md-0"
            >
                <Form>
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="form-floating mb-3">
                        <Field
                            className={getFieldClasses(error)}
                            name="username"
                            type="text"
                            required
                        />
                        <label htmlFor="username">Ваше имя</label>
                    </div>

                    <div className="form-floating mb-3">
                        <Field
                            className={getFieldClasses(error)}
                            name="password"
                            type="password"
                            required
                        />
                        <label htmlFor="password">Пароль</label>
                    </div>

                    { error && <Alert variant="danger">
                        {error}
                    </Alert> }

                    <Button className="w-100 mb-3" type="submit" disabled={isLoading}>Войти</Button>
                </Form>
            </Formik>
        </div>
    );
}
