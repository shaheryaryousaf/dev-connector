import { SET_ALERT, REMOVE_ALERT } from "../actions/types.js";
const initialState = [];

// It is basically a function, which needs a state and an action
// action will 1 mandotary thing, 1 is type & 2nd is optional payload(any data)
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_ALERT:
            return [...state, payload]
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload); // in this case, payload is just an ID, remove alert
        default:
            return state;
    }
}