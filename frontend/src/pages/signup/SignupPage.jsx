import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Card, CardBody, CardFooter } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { Formik, Form, Field } from 'formik'
import { IsAuthenticated, login } from '../../store/auth'
import api from '../../services/api'
import { signupSchema } from '../../validation/index.js'
import { useTranslation } from 'react-i18next'

export function SignupPage() {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isAuthenticated = useSelector(IsAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const [isLoading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const getFieldClasses = (error) => {
    return classNames('form-control', {
      'is-invalid': Boolean(error),
    })
  }

  const initialValues = {
    username: '',
    password: '',
    passwordRepeat: '',
  }

  const onSubmit = async (values) => {
    if (isLoading) {
      return
    }

    setLoading(true)
    setServerError('')

    try {
      const { data } = await api.auth.signup(values)

      dispatch(login({ token: data.token, user: data.username }))
      navigate('/', { replace: true })
    }
    catch (e) {
      if (e.response?.status === 409) {
        setServerError(t('errors.alreadyExists'))
      }
      else {
        setServerError(t('errors.base'))
      }
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-4">
        <Card>
          <CardBody className="p-5">
            <Formik
              initialValues={initialValues}
              validationSchema={signupSchema}
              onSubmit={onSubmit}
              validateOnChange={false}
              validateOnBlur={false}
              className="col-12 col-md-6 mt-3 mt-md-0"
            >
              {({ errors }) => (
                <Form>
                  <h1 className="text-center mb-4">Зарегистрироваться</h1>
                  <div className="form-floating mb-3">
                    <Field
                      className={getFieldClasses(errors.username)}
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="off"
                      placeholder={t('fields.name')}
                      required
                    />
                    <label htmlFor="username">{t('fields.name')}</label>

                    {errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </div>

                  <div className="form-floating mb-3">
                    <Field
                      className={getFieldClasses(errors.password)}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="off"
                      placeholder={t('fields.password')}
                      required
                    />
                    <label htmlFor="password">{t('fields.password')}</label>
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  <div className="form-floating mb-3">
                    <Field
                      className={getFieldClasses(errors.passwordRepeat)}
                      id="passwordRepeat"
                      name="passwordRepeat"
                      type="password"
                      autoComplete="off"
                      placeholder={t('fields.passwordRepeat')}
                      required
                    />
                    <label htmlFor="passwordRepeat">{t('fields.passwordRepeat')}</label>
                    {errors.passwordRepeat && (
                      <div className="invalid-feedback">
                        {errors.passwordRepeat}
                      </div>
                    )}
                  </div>

                  {serverError && (
                    <Alert variant="danger">{serverError}</Alert>
                  )}

                  <Button
                    className="w-100"
                    type="submit"
                    disabled={isLoading}
                    size="lg"
                  >
                    {t('buttons.create')}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardBody>
          <CardFooter className="d-flex justify-content-center">
            <Link to="/login">{t('buttons.logIn')}</Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
