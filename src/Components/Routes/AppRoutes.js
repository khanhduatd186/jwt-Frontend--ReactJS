
import { Switch, Route } from "react-router-dom";
import Register from '../LoginRegister/Register.js'
import Users from '../ManagerUsers/Users.js';
import Login from "../LoginRegister/Login.js";
import PrivateRoutes from "./PrivateRoutes.js";
const AppRoutes = (props) => {

    return (
        <>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>
                <Route exact path="/">
                    home
                </Route>

                <PrivateRoutes path="/users" component={Users} />
                <Route path='*'>
                    404 not found
                </Route>
            </Switch>
        </>

    );
}
export default AppRoutes;