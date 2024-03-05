import { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { UserContext } from "../../Context/UserContext";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const PrivateRoutes = (props) => {
    const history = useHistory();
    const { user } = useContext(UserContext)
    if (user && user.isAuthenticated === true) {
        return (
            <>
                < Route path={props.path} component={props.component} />
            </>

        );

    }
    else {
        return <Redirect to='/login'></Redirect>
    }

}
export default PrivateRoutes;