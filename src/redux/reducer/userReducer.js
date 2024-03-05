import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_ERROR } from "../action/types";


const INITIAL_STATE = {

    listUser: [],

};

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case FETCH_USER_REQUEST:

            console.log("check rq:", action)
            return {

                ...state

            };

        case FETCH_USER_SUCCESS:
            console.log("check ss:", action)
            return {
                ...state

            };
        case FETCH_USER_ERROR:
            console.log("check er:", action)
            return {
                ...state

            };

        default: return state;

    }

};

export default userReducer;