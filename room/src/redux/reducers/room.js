import {
    GET_ROOM_LIST_SUCCESS,
    GET_ROOM_LIST_FAIL,
    GET_ROOM_SUCCESS,
    GET_ROOM_FAIL,
    GET_ROOM_LIST_CATEGORIES_SUCCESS,
    GET_ROOM_LIST_CATEGORIES_FAIL,
    GET_SEARCH_ROOM_SUCCESS,
    GET_SEARCH_ROOM_FAIL
} from '../actions/room/types';

const initialState = {
    room_list: null,
    room_list_category: null,
    filtered_rooms: null,
    room: null,
    count: null,
    next: null,
    previous: null
};

export default function room(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_ROOM_LIST_CATEGORIES_SUCCESS:
            return {
                ...state,
                room_list_category: payload.results.Rooms,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case GET_ROOM_LIST_CATEGORIES_FAIL:
            return {
                ...state,
                room_list_category: null,
                count: null,
                next: null,
                previous: null,                
            }
        case GET_ROOM_LIST_SUCCESS:
            return {
                ...state,
                room_list: payload.results.Rooms,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case GET_ROOM_LIST_FAIL:
            return {
                ...state,
                room_list: null,
                count: null,
                next: null,
                previous: null,
            }
        case GET_ROOM_SUCCESS:
            return {
                ...state,
                room: payload.Room
            }
        case GET_ROOM_FAIL:
            return {
                ...state,
                room: null
            }
        case GET_SEARCH_ROOM_SUCCESS:
            return {
                ...state,
                filtered_rooms: payload.results.filtered_rooms,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case GET_SEARCH_ROOM_FAIL:
            return {
                ...state,
                filtered_rooms: null,
                count: null,
                next: null,
                previous: null,
            }
        default:
            return state
    }
}