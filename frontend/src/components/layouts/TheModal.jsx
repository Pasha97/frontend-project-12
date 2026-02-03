import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { type, isOpen, close, params } from '../../store/modal/index.js'

import AddChanelModal from '../modals/AddChanelModal.jsx'
import RenameChanelModal from '../modals/RenameChanelModal.jsx'
import RemoveChanelModal from '../modals/RemoveChanelModal.jsx'

const modals = {
  adding: AddChanelModal,
  renaming: RenameChanelModal,
  removing: RemoveChanelModal,
}

const TheModal = () => {
  const dispatch = useDispatch()

  const modalType = useSelector(type)
  const modalParams = useSelector(params)
  const isModalOpen = useSelector(isOpen)

  const handleClickClose = () => dispatch(close())

  const CurrentModal = modals[modalType]

  return (
    <Modal show={isModalOpen} onHide={handleClickClose} centered>
      {CurrentModal && <CurrentModal onClose={handleClickClose} params={modalParams} /> }
    </Modal>
  )
}

export default TheModal
