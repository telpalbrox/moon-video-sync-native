import axios from 'axios';
import { AppDispatcher } from '../AppDispatcher';
import { config } from '../config';

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
    }
};

export { RoomActions };
