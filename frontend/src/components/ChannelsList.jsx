import { Button, Nav, NavItem } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { changeChannel } from "../store/channels.js";

export function ChannelList() {
    const dispatch = useDispatch();

    const channels = useSelector((state) => state.channels.channels);
    const currentChannelId = useSelector((state) => state.channels.currentChannelId);

    const handleClickChanel = (id) => {
        dispatch(changeChannel(id))
    }

    return (
        <div className="bg-light flex-column d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <p>Каналы</p>
                <Button variant="outline-primary" size="sm">+</Button>
            </div>
            <Nav className="flex-column px-2 mb-3 overflow-auto h-100 d-block">
                {channels.map((channel) => (
                    <NavItem key={channel.id}>
                        <Button
                            variant={currentChannelId === channel.id ? 'secondary' : ''}
                            className="w-100 rounded-0 text-start"
                            onClick={() => handleClickChanel(channel.id)}
                        >
                            {channel.name}
                        </Button>
                    </NavItem>
                ))}
            </Nav>
        </div>
    );
}

export default ChannelList;
