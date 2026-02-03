import {
  Button,
  ModalBody,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap'
import { Field, Form, Formik } from 'formik'
import classNames from 'classnames'
import { useState } from 'react'
import api from '../../services/api/index.js'
import { channels, changeChannel } from '../../store/channels'
import { useDispatch, useSelector } from 'react-redux'
import { validateChannelName } from '../../validation/index.js'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import filter from '../../utils/filterMessage.js'

const AddChannelModal = ({ onClose }) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const listChannels = useSelector(channels)

  const getFieldClasses = (error) => {
    return classNames('form-control', {
      'is-invalid': Boolean(error),
    })
  }

  const [isLoading, setLoading] = useState(false)

  const initialValues = {
    name: '',
  }
  const validationScheme = validateChannelName(listChannels)

  const onSubmit = async ({ name }) => {
    if (isLoading) {
      return
    }

    setLoading(true)

    try {
      const response = await api.channels.addChannels({ name: filter.clean(name) })
      dispatch(changeChannel(response.data.id))
      onClose()
      toast.success(t('toasts.createdChannel'))
    }
    catch {
      toast.error(t('toasts.error'))
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ModalHeader>
        <ModalTitle>
          {t('modal.addChannel')}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={initialValues}
          validationSchema={validationScheme}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={onSubmit}
        >
          {({ errors }) => (
            <Form>
              <Field
                autoFocus
                type="text"
                name="name"
                id="name"
                placeholder={t('fields.placeholderChanel')}
                disabled={isLoading}
                className={getFieldClasses(errors.name)}
              />
              <label htmlFor="name" className="visually-hidden">{t('fields.placeholderChanel')}</label>

              {errors.name && <div className="invalid-feedback">{errors.name}</div>}

              <div className="d-flex justify-content-end mt-2">
                <Button
                  variant="secondary"
                  onClick={onClose}
                  className="me-2"
                  disabled={isLoading}
                >
                  {t('buttons.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading}
                >
                  {t('buttons.create')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </>
  )
}

export default AddChannelModal
