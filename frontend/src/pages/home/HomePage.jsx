import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import api from "../../services/api";
import ChannelList from "../../components/ChannelsList.jsx";
import MessagesList from "../../components/MessagesList.jsx";
import { initChannels } from "../../store/channels";
import { addMessage, initMessages } from "../../store/messages";
import { createSocket } from "../../services/socket/index.js";

export function HomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        const loadData = async () => {
            try {
                const [channels, messages] = await Promise.all([
                    api.channels.getChannels(),
                    api.messages.getMessages()
                ]);

                dispatch(initChannels(channels.data));
                dispatch(initMessages(messages.data));
            } catch {
                console.log('error')
            }
        };

        const socket = createSocket();

        socket.on('newMessage', (payload) => {
            dispatch(addMessage(payload));
        })


        loadData();

        return () => {
            socket.off("newMessage");
        };
    }, [dispatch]);

    return (
        <div className="container h-100 d-flex p-4">
            <div className="h-100 m-auto w-100 overflow-hidden rounded shadow container">
                <div className="row h-100 bg-white flex-md-row">
                    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100">
                        <ChannelList/>
                    </div>
                    <div className="col p-0 h-100">
                        <MessagesList/>
                    </div>
                </div>
            </div>
        </div>
    );
}
