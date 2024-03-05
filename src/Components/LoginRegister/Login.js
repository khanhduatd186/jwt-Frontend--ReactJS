import "./login.scss"
import { useContext, useState } from "react";
//import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";
import { loginUser } from "../../Services/userService";
import { UserContext } from "../../Context/UserContext";
const Login = (props) => {
    const { loginContext } = useContext(UserContext)
    const [valuelogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");
    const defaultValidInput = {
        isValidValueLogin: true,
        isValidPassword: true

    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)
    const history = useHistory();
    const HandleCreateNewAccount = () => {
        setObjCheckInput(defaultValidInput);
        history.push("/register")

    }
    const HandleLogin = async () => {
        setObjCheckInput(defaultValidInput)
        if (!valuelogin) {
            setObjCheckInput({ ...defaultValidInput, isValidValueLogin: false })
            toast.error("không được để trống")
            return;

        }
        if (!password) {
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false })
            toast.error("không được để trống")
            return;
        }
        let response = await loginUser(valuelogin, password)
        let serviceData = response
        if (serviceData && +serviceData.EC === 0) {
            let groupWithRoles = response.DT.groupWithRoles;
            let email = response.DT.email;
            let username = response.DT.username;

            let token = response.DT.access_token
            let data = {
                isAuthenticated: true,
                token: token,
                accout: {
                    groupWithRoles, email, username
                }
            }
            // sessionStorage.setItem("account", JSON.stringify(data));

            loginContext(data)
            toast.success(serviceData.EM)
            history.push("/users");
            // window.location.reload();
        } else {
            toast.error(serviceData.EM)
        }
    }
    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === "Enter") {
            HandleLogin();
        }

    }
    // const isValidInputs = () => {
    //     setObjCheckInput(defaultValidInput);
    //     const res = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //     if (!email) {
    //         setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
    //         toast.error("không được để trống email")
    //         return false;
    //     }
    //     if (!res.test(email)) {
    //         setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
    //         toast.error("sai định dạng email")
    //         return false;
    //     }
    //     if (!phone) {
    //         setObjCheckInput({ ...defaultValidInput, isValidPhone: false })
    //         toast.error("không được để trống phone")
    //         return false;
    //     }

    //     if (!password) {
    //         setObjCheckInput({ ...defaultValidInput, isValidPassword: false })
    //         toast.error("không được để trống password")
    //         return false;
    //     }
    //     return true;
    // }
    return (
        <div className="login-container">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className="brand">
                            khanh du

                        </div>
                        <div className="detail">
                            khanh du app jwt
                        </div>
                    </div>
                    <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
                        <div className="brand d-sm-none">
                            khanh du

                        </div>
                        <input type="text" className={objCheckInput.isValidValueLogin ? "form-control" : "form-control is-invalid "} placeholder="Email" value={valuelogin} onChange={(event) => setValueLogin(event.target.value)} onKeyPress={(event) => handlePressEnter(event)}></input>
                        <input type="password" className={objCheckInput.isValidPassword ? "form-control" : "form-control is-invalid "} placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} ></input>
                        <button className="btn btn-primary" type="submit" onClick={() => HandleLogin()}>Login</button>
                        <span className="text-center"><a className="forgot-password" href="/">Forgot Your password</a></span>
                        <hr />
                        <div className="text-center" >

                            <button className="btn btn-success" onClick={() => HandleCreateNewAccount()}>
                                Create New Accout
                            </button>
                        </div>


                    </div>

                </div>
            </div>
        </div>

    );
}
export default Login;