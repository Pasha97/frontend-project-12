import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardFooter } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { Formik, Form, Field } from 'formik';
import { IsAuthenticated, login } from '../../store/auth';
import api from "../../services/api";

export function SignupPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(IsAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate]);


    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getFieldClasses = (error) => {
        return classNames('form-control', {
            'is-invalid': Boolean(error),
        });
    }

    const initialValues = {
        username: '',
        password: '',
        passwordRepeat: '',
    };

    const onSubmit = async (values) => {
        if (values.password !== values.passwordRepeat) {
            setError('Пароли должны совпадать');
            return;
        }

        if (isLoading) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            const { data } = await api.auth.signup(values);

            dispatch(login({ token: data.token, user: data.username }));
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
            <div className="col-12 col-md-8 col-xxl-4">
                <Card>
                    <CardBody className="p-5">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            className="col-12 col-md-6 mt-3 mt-md-0"
                        >
                            <Form>
                                <h1 className="text-center mb-4">Зарегистрироваться</h1>
                                <div className="form-floating mb-3">
                                    <Field
                                        className={getFieldClasses(error)}
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Ваше имя"
                                        required
                                    />
                                    <label htmlFor="username">Ваше имя</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <Field
                                        className={getFieldClasses(error)}
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Пароль"
                                        required
                                    />
                                    <label htmlFor="password">Пароль</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <Field
                                        className={getFieldClasses(error)}
                                        id="passwordRepeat"
                                        name="passwordRepeat"
                                        type="password"
                                        placeholder="Подтвердите пароль"
                                        required
                                    />
                                    <label htmlFor="password">Подтвердите пароль</label>
                                </div>

                                {error && <Alert variant="danger">
                                    {error}
                                </Alert>}

                                <Button className="w-100" type="submit" disabled={isLoading} size="lg">Войти</Button>
                            </Form>
                        </Formik>
                    </CardBody>
                    <CardFooter className="d-flex justify-content-center">
                        <Link to="/login">Войти</Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
