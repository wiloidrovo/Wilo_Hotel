import { combineReducers } from "redux";
import categories from "./categories";
import room from "./room";

export default combineReducers({
    categories,
    room
})