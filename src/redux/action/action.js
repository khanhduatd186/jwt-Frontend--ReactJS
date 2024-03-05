import { fetchAllUser } from "../../Services/userService";
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_ERROR } from "./types"
export const fetchAllUserData = () => {
    return async (dispatch, getState) => {
        dispatch(fetchUserRequest());
        try {
            let response = await fetchAllUser(1, 2);
            if (response && response.EC === 0) {
                dispatch(fetchUserSuccess(response.DT))
            }

        } catch (error) {
            dispatch(fetchUserError());
            console.log(error);
        }



    }
}

export const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}
export const fetchUserSuccess = (data) => {
    return {
        type: FETCH_USER_SUCCESS,
        data
    }

}
export const fetchUserError = () => {
    return {
        type: FETCH_USER_ERROR
    }

}