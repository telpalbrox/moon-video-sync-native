import axios from 'axios';
import io from 'socket.io-client';
import { AppDispatcher } from '../AppDispatcher';
import { config } from '../config';

let socket = null;

const RoomActions = {
    async getAll(email, password) {
        AppDispatcher.dispatch({
            type: 'ROOMS_REQUEST'
        });
        try {
            let response = await axios.get(`${config.API_URL}/rooms`, { withCredentials: true });
            AppDispatcher.dispatch({
                type: 'ROOMS_REQUEST_SUCCESS',
                rooms: response.data
            });
        } catch (err) {
            AppDispatcher.dispatch({
                type: 'ROOMS_REQUEST_ERROR',
                err
            });
        }
    },
    async getOne(id) {
        AppDispatcher.dispatch({
            type: 'ROOM_REQUEST'
        });
        try {
            let response = await axios.get(`${config.API_URL}/rooms/${id}`, { withCredentials: true });
            AppDispatcher.dispatch({
                type: 'ROOM_REQUEST_SUCCESS',
                room: response.data
            });
        } catch (err) {
            AppDispatcher.dispatch({
                type: 'ROOM_REQUEST_ERROR',
                err
            });
        }
    },
    join(id) {
        socket = io(config.API_URL, { transports: ['websocket'] });
        socket.connect();
        socket.on('connect', async () => {
            await axios.post(`${config.API_URL}/socket/${socket.id}`, { socketId: socket.id });
            socket.emit('join room', { id });
            socket.on('video changed', (video) => {
                console.log('change videooo')
                AppDispatcher.dispatch({
                    type: 'ROOM_CHANGE_VIDEO',
                    video
                });
            });
        });
    },
    exit(id) {

    }
};

export { RoomActions };
