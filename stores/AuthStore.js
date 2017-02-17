import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';
import {AppDispatcher} from '../AppDispatcher';

class AuthStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return Immutable.Map({
            loading: false
        });
    }

    reduce(state, action) {
        switch(action.type) {
            case 'LOGIN_REQUEST':
                return state.set('loading', true);
            case 'LOGIN_REQUEST_SUCCESS':
            case 'LOGIN_REQUEST_ERROR':
                return state.set('loading', false);
            default:
                return state;
        }
    }
}

export default new AuthStore();
