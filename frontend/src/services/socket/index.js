import { io } from "socket.io-client";

let socket = null;

export const createSocket = () => {
    if (!socket) {
        socket = io('/', {
            // transports: ["websocket"],
        });
    }

    return socket;
};

export const getSocket = () => socket;
