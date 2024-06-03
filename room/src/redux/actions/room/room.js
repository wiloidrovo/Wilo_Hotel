import axios from 'axios';
import {
    GET_ROOM_LIST_SUCCESS,
    GET_ROOM_LIST_FAIL,
    GET_ROOM_SUCCESS,
    GET_ROOM_FAIL,
    GET_ROOM_LIST_CATEGORIES_SUCCESS,
    GET_ROOM_LIST_CATEGORIES_FAIL,
    GET_SEARCH_ROOM_SUCCESS,
    GET_SEARCH_ROOM_FAIL
} from "./types"

export const get_room_list = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/room/list`, config)
        if(res.status === 200){
            dispatch({
                type: GET_ROOM_LIST_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_ROOM_LIST_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_ROOM_LIST_FAIL
        });
    }
}

export const get_room_list_page = (page) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/room/list?p=${page}`, config)
        if(res.status === 200){
            dispatch({
                type: GET_ROOM_LIST_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_ROOM_LIST_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_ROOM_LIST_FAIL
        });
    }
}

export const get_room_list_category = (slug) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/room/by_category?slug=${slug}`, config)
        if(res.status === 200){
            dispatch({
                type: GET_ROOM_LIST_CATEGORIES_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_ROOM_LIST_CATEGORIES_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_ROOM_LIST_CATEGORIES_FAIL
        });
    }
}

export const get_room_list_category_page = (slug, page) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/room/by_category?slug=${slug}&p=${page}`, config)
        if(res.status === 200){
            dispatch({
                type: GET_ROOM_LIST_CATEGORIES_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_ROOM_LIST_CATEGORIES_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_ROOM_LIST_CATEGORIES_FAIL
        });
    }
}

export const get_room = (slug) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/room/detail/${slug}`, config);

        if (res.status === 200){
            dispatch({
                type: GET_ROOM_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_ROOM_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_ROOM_FAIL
        });
    }
}

export const search_room = (search_term) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/room/search?s=${search_term}`, config);
        
        if (res.status === 200) {
            dispatch({
                type: GET_SEARCH_ROOM_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_SEARCH_ROOM_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_SEARCH_ROOM_FAIL
        });
    }
};

export const search_room_page = (search_term,page) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/room/search?s=${search_term}&p=${page}`, config);
        
        if (res.status === 200) {
            dispatch({
                type: GET_SEARCH_ROOM_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_SEARCH_ROOM_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_SEARCH_ROOM_FAIL
        });
    }
};