import React, { useEffect, useState } from "react";

import { getUserAccount } from "../Services/userService";

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
    const userDefault = {
        isLoading: true, isAuthenticated: false, token: "", account: {}
    }
    const [user, setUser] = useState(userDefault);

    //const location = useLocation();

    const loginContext = (user) => {
        setUser({ ...user, isLoading: false })
    };
    const logoutContext = (user) => {
        setUser({ ...userDefault, isLoading: false })
    };
    const fetchUser = async () => {
        let response = await getUserAccount();
        if (response && +response.EC === 0) {
            let groupWithRoles = response.DT.groupWithRoles;
            let email = response.DT.email;
            let username = response.DT.username;

            let token = response.DT.access_token
            let data = {
                isAuthenticated: true,
                token: token,
                accout: {
                    groupWithRoles, email, username
                },
                isLoading: false
            }
            setUser(data)
        } else {
            setUser({ ...userDefault, isLoading: false })
        }

    }
    useEffect(() => {
        if (window.location.pathname !== '/' || window.location.pathname !== '/login') {
            fetchUser();
        }

    }, [])
    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    )
}
export { UserContext, UserProvider };