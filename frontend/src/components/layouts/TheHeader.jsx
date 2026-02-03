import { Button, Navbar, NavbarBrand } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { logout, IsAuthenticated } from '../../store/auth/index.js'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export const TheHeader = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const IsAuth = useSelector(IsAuthenticated)

  const handleClickLogout = () => {
    dispatch(logout())
    navigate('/login/', { replace: true })
  }

  return (
    <Navbar className="shadow-sm" bg="white" expand="lg">
      <div className="container">
        <NavbarBrand href="#">Hexlet Chat</NavbarBrand>

        { IsAuth && (
          <Button onClick={handleClickLogout}>
            {t('buttons.logOut')}
          </Button>
        ) }
      </div>
    </Navbar>
  )
}

export default TheHeader
