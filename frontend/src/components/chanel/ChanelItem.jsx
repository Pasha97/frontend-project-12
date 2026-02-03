import { useDispatch } from 'react-redux'
import { open } from '../../store/modal/index.js'
import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const ChanelItemDropDown = ({ isActive, channel }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleClickRename = () => {
    dispatch(open({ type: 'renaming', params: { ...channel } }))
  }

  const handleClickRemove = () => {
    dispatch(open({ type: 'removing', params: { ...channel } }))
  }

  return (
    <>
      <DropdownToggle size="sm" variant={isActive ? 'secondary' : 'link'} id="dropdown-basic">
        <span className="visually-hidden">Управление каналом</span>
      </DropdownToggle>

      <DropdownMenu>
        <DropdownItem href="#/action-1" onClick={handleClickRename}>{t('buttons.rename')}</DropdownItem>
        <DropdownItem href="#/action-2" onClick={handleClickRemove}>{t('buttons.remove')}</DropdownItem>
      </DropdownMenu>
    </>
  )
}

const ChanelItem = ({ channel, onClick, isActive }) => {
  return (
    <Dropdown as={ButtonGroup} className="w-100">
      <Button
        variant={isActive ? 'secondary' : ''}
        className="w-100 rounded-0 text-start text-truncate"
        onClick={() => onClick(channel.id)}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>

      {channel.removable && <ChanelItemDropDown isActive={isActive} channel={channel} />}
    </Dropdown>
  )
}

export default ChanelItem
