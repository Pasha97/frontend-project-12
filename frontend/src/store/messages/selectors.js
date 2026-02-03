import { createSelector } from '@reduxjs/toolkit'

export const selectMessagesByChannelId = channelId => createSelector(
  state => state.messages.messages,
  messages => messages.filter(m => m.channelId === channelId),
)
