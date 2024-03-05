//import axios from "axios"
import axios from "../Setup/axios"
const registerNewUser = async (email, phone, password, username) => {
    return await axios.post("api/v1/register", {
        email, phone, password, username
    })
}
const loginUser = async (valueLogin, password) => {
    return await axios.post("api/v1/login", {
        valueLogin, password
    })
}
const fetchAllUser = async (page, limit) => {

    return await axios.get(`api/v1/user/read?page=${page}&limit=${limit}`);
}
const DeleteUserById = async (user) => {
    return await axios.delete(`api/v1/user/delete`, { data: { id: user.id } });
}
const getGroup = async () => {

    return await axios.get("api/v1/group/read");
}
const createNewUser = async (userDate) => {
    return await axios.post("api/v1/user/created", {
        ...userDate
    })
}
const updateUser = async (userDate) => {
    return await axios.put("api/v1/user/update", {
        ...userDate
    })
}
const getUserAccount = async () => {
    return await axios.get("api/v1/account");
}
const logoutUser = async () => {
    return await axios.post("api/v1/logout")
}
export {
    registerNewUser,
    loginUser,
    fetchAllUser,
    DeleteUserById,
    getGroup,
    createNewUser,
    updateUser,
    getUserAccount,
    logoutUser
};