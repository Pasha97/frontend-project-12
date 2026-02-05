import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Card, CardBody, CardFooter } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Formik, Form, Field } from 'formik'
import { IsAuthenticated, login } from '../../store/auth'
import api from '../../services/api'

export function LoginPage() {
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
  const [error, setError] = useState('')

  const getFieldClasses = (error) => {
    return classNames('form-control', {
      'is-invalid': Boolean(error),
    })
  }

  const initialValues = {
    username: '',
    password: '',
  }

  const onSubmit = async (values) => {
    if (isLoading) {
      return
    }

    setLoading(true)
    setError('')

    try {
      const { data } = await api.auth.login(values)
      dispatch(login({ token: data.token, user: data.username }))
      navigate('/', { replace: true })
    }
    catch (e) {
      if (e.response.status === 401) {
        setError(t('errors.incorrect'))
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
              onSubmit={onSubmit}
              className="col-12 col-md-6 mt-3 mt-md-0"
            >
              <Form>
                <h1 className="text-center mb-4">{t('buttons.logIn')}</h1>
                <div className="form-floating mb-3">
                  <Field
                    className={getFieldClasses(error)}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    placeholder={t('fields.nickname')}
                    required
                  />
                  <label htmlFor="username">{t('fields.nickname')}</label>
                </div>

                <div className="form-floating mb-3">
                  <Field
                    className={getFieldClasses(error)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="off"
                    placeholder={t('fields.password')}
                    required
                  />
                  <label htmlFor="password">{t('fields.password')}</label>
                </div>

                {error && (
                  <Alert variant="danger">
                    {error}
                  </Alert>
                )}

                <Button className="w-100" type="submit" disabled={isLoading} size="lg">{t('buttons.logIn')}</Button>
              </Form>
            </Formik>
          </CardBody>
          <CardFooter className="d-flex justify-content-center">
            <Link to="/signup">{t('buttons.register')}</Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
