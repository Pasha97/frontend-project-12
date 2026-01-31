import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getChannels } from "../../services/api/channels.js";
import { getMessages } from "../../services/api/messages.js";
import ChannelList from "../../components/ChannelsList.jsx";
import MessagesList from "../../components/MessagesList.jsx";
import { initChannels } from "../../store/channels.js";
import { initMessages } from "../../store/messages.js";

export function HomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        const loadData = async () => {
            try {
                const [channels, messages] = await Promise.all([
                    getChannels(),
                    getMessages()
                ]);

                dispatch(initChannels(channels.data));
                dispatch(initMessages(messages.data));
            } catch {
              console.log('error')
            }
        };

        loadData();
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
