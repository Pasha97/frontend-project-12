import {
    Button,
    ModalBody,
    ModalHeader,
    ModalTitle
} from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import classNames from "classnames";
import { useState } from "react";
import api from "../../services/api/index.js";
import { channels, changeChannel } from "../../store/channels";
import { useDispatch, useSelector } from "react-redux";
import { validateChannelName } from "../../validation/index.js";

const AddChannelModal = ({ onClose }) => {
    const dispatch = useDispatch();

    const listChannels = useSelector(channels);


    const getFieldClasses = (error) => {
        return classNames('form-control', {
            'is-invalid': Boolean(error),
        });
    }

    const [isLoading, setLoading] = useState(false);

    const initialValues = {
        name: '',
    };
    const validationScheme = validateChannelName(listChannels);

    const onSubmit = async ({ name }) => {
        if (isLoading) {
            return;
        }

        setLoading(true);

        try {
            const response = await api.channels.addChannels({ name });
            dispatch(changeChannel(response.data.id));
            onClose();
        } catch (e) {
            console.log('e.response', e, e.response)
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <ModalHeader>
                <ModalTitle>
                    Добавить канал
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
                                placeholder="Введите название канала"
                                disabled={isLoading}
                                className={getFieldClasses(errors.name)}
                            />

                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}

                            <div className="d-flex justify-content-end mt-2">
                                <Button
                                    variant="secondary"
                                    onClick={onClose}
                                    className="me-2"
                                    disabled={isLoading}
                                >
                                    Отменить
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={isLoading}
                                >
                                    Создать
                                </Button>
                            </div>
                        </Form>
                    )
                    }
                </Formik>
            </ModalBody>
        </>
    );
}

export default AddChannelModal;