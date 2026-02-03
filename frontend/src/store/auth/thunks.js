import { setUser, logoutUser } from './slice'
import { setToken, removeToken, removeUserName, setUserName } from '../../services/storage/auth'
import { resetMessages } from '../messages'
import { resetChannels } from '../channels'

export const login = ({ user, token }) => (dispatch) => {
  setToken(token)
  setUserName(user)
  dispatch(setUser({ user, token }))
}

export const logout = () => (dispatch) => {
  removeToken()
  removeUserName()
  dispatch(logoutUser())
  dispatch(resetMessages())
  dispatch(resetChannels())
}
