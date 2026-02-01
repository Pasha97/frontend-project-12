export const currentChannelId = (state) => state.channels.currentChannelId;

export const channels = (state) => state.channels.channels;

export const currentChannel = (state) => {
    const { channels, currentChannelId } = state.channels;
    return channels.find((ch) => ch.id === currentChannelId) || {};
};