import {
    Button,
    ModalBody,
    ModalHeader,
    ModalTitle
} from "react-bootstrap";
import { useState } from "react";
import api from "../../services/api/index.js";
import { useTranslation } from "react-i18next";

const RemoveChanelModal = ({ onClose, params }) => {
    const { t } = useTranslation();

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
                    {t('modal.deleteChannel')}
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <p>{t('modal.deleteText')}: {name} ?</p>
                <div className="d-flex justify-content-end mt-2">
                    <Button
                        variant="secondary"
                        type="button"
                        className="me-2"
                        onClick={onClose}
                    >
                        {t('buttons.cancel')}
                    </Button>
                    <Button
                        variant="danger"
                        disabled={isLoading}
                        type="submit"
                        autoFocus
                        onClick={handleClickRemove}
                    >
                        {t('buttons.remove')}
                    </Button>
                </div>
            </ModalBody>
        </>
    );
}

export default RemoveChanelModal;