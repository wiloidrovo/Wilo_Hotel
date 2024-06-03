import{
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
} from '../actions/categories/types'

const initialState = {
    categories: null
}

export default function categories(state=initialState, action){
    const { type, payload } = action;

    switch(type){
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload.Categories
            }
        case GET_CATEGORIES_FAIL:
            return {
                ...state,
                categories: []
            }
        default:
            return state
    }
}