import axios from 'axios';
import { AppDispatcher } from '../AppDispatcher';
import { config } from '../config';
import { Storage } from '../Storage';

const AuthActions = {
    async login(email, password) {
        AppDispatcher.dispatch({
            type: 'LOGIN_REQUEST'
        });
        try {
            await axios.post(`${config.API_URL}/login`, { email, password });
            await Storage.setItem('logged', 'true');
            AppDispatcher.dispatch({
                type: 'LOGIN_REQUEST_SUCCESS'
            });
        } catch (err) {
            await Storage.setItem('logged', 'false');
            AppDispatcher.dispatch({
                type: 'LOGIN_REQUEST_ERROR',
                err
            });
        }
    },
    async logout() {
        AppDispatcher.dispatch({
            type: 'LOGOUT_REQUEST'
        });
        try {
            await axios.post(`${config.API_URL}/logout`);
            await Storage.setItem('logged', 'false');
            AppDispatcher.dispatch({
                type: 'LOGOUT_REQUEST_SUCCESS'
            });
        } catch (err) {
            await Storage.setItem('logged', 'false');
            AppDispatcher.dispatch({
                type: 'LOGOUT_REQUEST_ERROR',
                err
            });
        }
    }
};

export { AuthActions };
