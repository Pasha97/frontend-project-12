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
import { channels } from "../../store/channels";
import { useSelector } from "react-redux";
import { validateChannelName } from "../../validation/index.js";


const RenameChanelModal = ({ onClose, params }) => {
    const { id } = params;
    const listChannels = useSelector(channels);

    const getFieldClasses = (error) => {
        return classNames('form-control', {
            'is-invalid': Boolean(error),
        });
    }

    const [isLoading, setLoading] = useState(false);

    const initialValues = {
        name: params.name,
    };
    const validationScheme = validateChannelName(listChannels);

    const handleClickSubmit = async ({ name }) => {
        if (isLoading) {
            return;
        }

        setLoading(true);

        try {
            await api.channels.editChannels(id, { name });
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
                    onSubmit={handleClickSubmit}
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
                                    Переименовать
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

export default RenameChanelModal;