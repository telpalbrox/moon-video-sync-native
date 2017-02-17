import axios from 'axios';
import { AppDispatcher } from '../AppDispatcher';
import { config } from '../config';

const AuthActions = {
    async login(email, password) {
        AppDispatcher.dispatch({
            type: 'LOGIN_REQUEST'
        });
        try {
            const response = await axios.post(`${config.API_URL}/login`, { email, password });
            AppDispatcher.dispatch({
                type: 'LOGIN_REQUEST_SUCCESS'
            });
        } catch (err) {
            AppDispatcher.dispatch({
                type: 'LOGIN_REQUEST_ERROR',
                err
            });
        }
    }
};

export { AuthActions };
