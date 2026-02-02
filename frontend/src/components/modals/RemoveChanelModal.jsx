import {
    Button,
    ModalBody,
    ModalHeader,
    ModalTitle
} from "react-bootstrap";
import { useState } from "react";
import api from "../../services/api/index.js";

const RemoveChanelModal = ({ onClose, params }) => {
    const { id, name } = params;

    const [isLoading, setLoading] = useState(false);

    const handleClickRemove = async () => {
        if (isLoading) {
            return;
        }

        setLoading(true);

        try {
            await api.channels.deleteChannels(id);
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
                    Удалить канал
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <p>Вы уверены что хотите удалить канал: {name} ?</p>
                <div className="d-flex justify-content-end mt-2">
                    <Button
                        variant="secondary"
                        type="button"
                        className="me-2"
                        onClick={onClose}
                    >
                        Отмена
                    </Button>
                    <Button
                        variant="danger"
                        disabled={isLoading}
                        type="submit"
                        autoFocus
                        onClick={handleClickRemove}
                    >
                        Удалить
                    </Button>
                </div>
            </ModalBody>
        </>
    );
}

export default RemoveChanelModal;