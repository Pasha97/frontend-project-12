import { Nav, NavItem, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { channels, currentChannelId, changeChannel } from '../../store/channels/index.js'
import { open } from '../../store/modal/index.js'
import ChanelItem from './ChanelItem.jsx'
import { useTranslation } from 'react-i18next'

export function ChannelContainer() {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const listChannels = useSelector(channels)
  const activeChannelId = useSelector(currentChannelId)

  const handleClickAdd = () => {
    dispatch(open({ type: 'adding' }))
  }

  const handleClickChanel = (id) => {
    dispatch(changeChannel(id))
  }

  return (
    <div className="bg-light flex-column d-flex h-100">
      <div className="d-flex mt-1 justify-content-between align-content-center  mb-2 ps-4 pe-2 p-4">
        <p className="mb-0">{t('common.channels')}</p>
        <Badge bg="primary" onClick={handleClickAdd}>+</Badge>
      </div>
      <Nav className="flex-column px-2 mb-3 overflow-auto h-100 d-block">
        {listChannels.map(channel => (
          <NavItem key={channel.id}>
            <ChanelItem
              channel={channel}
              isActive={activeChannelId === channel.id}
              onClick={handleClickChanel}
            />
          </NavItem>
        ))}
      </Nav>
    </div>
  )
}

export default ChannelContainer
