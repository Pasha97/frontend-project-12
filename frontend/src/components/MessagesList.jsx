import { useSelector } from "react-redux";
import { InputGroup, FormControl, Button } from "react-bootstrap";

export function MessagesList() {
    const currentChannel = useSelector((state) => {
        const { channels, currentChannelId } = state.channels;
        return channels.find((ch) => ch.id === currentChannelId) || {};
    });


    return (
        <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0"><b># { currentChannel.name }</b></p>
                <span className="text-muted">0 сообщений</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5"></div>
            <div className="mt-auto px-5 py-3">
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Введите сообщение"
                    />
                    <Button>
                        Отправить
                    </Button>
                </InputGroup>
            </div>
        </div>
    );
}

export default MessagesList;
