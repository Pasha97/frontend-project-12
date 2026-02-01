import { Button, Nav, NavItem, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import  { channels, currentChannelId, changeChannel } from '../store/channels';

export function ChannelList() {
    const dispatch = useDispatch();

    const listChannels = useSelector(channels);
    const activeChannelId = useSelector(currentChannelId);

    const handleClickChanel = (id) => {
        dispatch(changeChannel(id))
    }

    return (
        <div className="bg-light flex-column d-flex">
            <div className="d-flex mt-1 justify-content-between align-content-center  mb-2 ps-4 pe-2 p-4">
                <p className="mb-0">Каналы</p>
                <Badge bg="primary">+</Badge>
            </div>
            <Nav className="flex-column px-2 mb-3 overflow-auto h-100 d-block">
                {listChannels.map((channel) => (
                    <NavItem key={channel.id}>
                        <Button
                            variant={activeChannelId === channel.id ? 'secondary' : ''}
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
