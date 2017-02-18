import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';
import { AppDispatcher } from '../AppDispatcher';

class RoomStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return Immutable.Map({
            loading: false,
            rooms: null,
            room: null,
            error: false
        });
    }

    reduce(state, action) {
        switch (action.type) {
            case 'ROOMS_REQUEST':
                return state.set('loading', true);
            case 'ROOMS_REQUEST_SUCCESS':
                return state = state.set('rooms', Immutable.List(action.rooms)).set('loading', false).set('error', false);
            case 'ROOMS_REQUEST_ERROR':
                console.error(action.err);
                return state.set('room', null).set('loading', false).set('error', true);
            case 'ROOM_REQUEST':
                return state.set('loading', true);
            case 'ROOM_REQUEST_SUCCESS':
                return state = state.set('room', Immutable.Map(action.room)).set('loading', false).set('error', false);
            case 'ROOM_REQUEST_ERROR':
                console.error(action.err);
                return state.set('room', null).set('loading', false).set('error', true);
            default:
                return state;
        }
    }
}

export default new RoomStore();
