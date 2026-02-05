import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { InputGroup, Button } from 'react-bootstrap'
import { Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { user } from '../store/auth'
import { currentChannel, currentChannelId } from '../store/channels'
import { selectMessagesByChannelId } from '../store/messages'
import api from '../services/api'
import filter from '../utils/filterMessage'

const Message = ({ message }) => {
  return (
    <div className="text-break mb-2">
      <b>
        {' '}
        {message.username}
        {' '}
      </b>
      {' '}
      {message.body}
    </div>
  )
}

export function MessagesContainer() {
  const { t } = useTranslation()

  const activeChannel = useSelector(currentChannel)
  const activeChannelId = useSelector(currentChannelId)
  const messages = useSelector(selectMessagesByChannelId(activeChannelId))

  const getFieldClasses = (error) => {
    return classNames('form-control', {
      'is-invalid': Boolean(error),
    })
  }

  const userName = useSelector(user)

  const messagesBox = useRef(null)
  const inputField = useRef(null)

  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const initialValues = {
    message: '',
  }

  const setFocusInput = () => {
    inputField.current.focus()
  }

  useEffect(() => {
    messagesBox.current.scrollTop = messagesBox.current.scrollHeight
  }, [messages])

  useEffect(() => {
    setFocusInput()
  }, [activeChannelId])

  const onSubmit = async ({ message }, { resetForm }) => {
    if (isLoading) {
      return
    }

    setLoading(true)
    setError('')

    const requestData = {
      body: filter.clean(message),
      channelId: activeChannelId,
      username: userName,
    }

    try {
      await api.messages.addMessages(requestData)
      resetForm()
      setTimeout(() => setFocusInput(), 100)
    }
    catch {
      toast.error(t('toasts.error'))
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {activeChannel.name}
          </b>
        </p>
        <span className="text-muted">
          {messages.length}
          {' '}
          {t('common.counter')}
        </span>
      </div>
      <div
        id="messages-box"
        className="chat-messages overflow-auto px-5"
        ref={messagesBox}
      >
        {messages && messages.map(message => (<Message message={message} key={message.id} />))}
      </div>
      <div className="mt-auto px-5 py-3">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          <Form>
            <InputGroup className="mb-3">
              <Field
                autoFocus
                innerRef={inputField}
                type="text"
                name="message"
                required
                autoComplete="off"
                className={getFieldClasses(error)}
                placeholder={t('fields.placeholderMessage')}
                aria-label={t('fields.placeholderMessageAria')}
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                {t('buttons.submit')}
              </Button>
            </InputGroup>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default MessagesContainer
