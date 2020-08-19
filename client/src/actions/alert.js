import { v4 as uuid } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

// we want to dipatch more than one action types so we use "dipatch" in arrow function
// alerts will have an id, msg and alert type 
// We are able to use dispatch in arrow function, due to thunk middleware
export const setAlert = (msg, alertType) => dispatch => {
    const id = uuid();

    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });

    setTimeout(() => dispatch({
        type: REMOVE_ALERT,
        payload: id
    }), 5000);
}

// This payload will go to alert reducer, where we're calling this type in switch
