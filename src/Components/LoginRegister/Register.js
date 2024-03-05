import { useState } from "react";
import "./Register.scss"
//import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

import { registerNewUser } from "../../Services/userService";
const Register = (props) => {

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidUsername: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)
    const history = useHistory();
    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput);
        const res = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!email) {
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
            toast.error("không được để trống email")
            return false;
        }
        if (!res.test(email)) {
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
            toast.error("sai định dạng email")
            return false;
        }
        if (!phone) {
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false })
            toast.error("không được để trống phone")
            return false;
        }
        if (!username) {
            setObjCheckInput({ ...defaultValidInput, isValidUsername: false })
            toast.error("không được để trống username")
            return false;
        }
        if (!password) {
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false })
            toast.error("không được để trống password")
            return false;
        }
        if (password !== confirmPassword) {
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false })
            toast.error("confirm không trùng khớp")
            return false;
        }


        return true;
    }
    const HandleLoginPage = () => {
        history.push("/login")

    }
    const handleRegister = async () => {
        let check = isValidInputs();
        if (check === true) {
            //let await registerNewUser(email, phone, password, username);
            let response = await registerNewUser(email, phone, password, username);
            //console.log(response);
            let serviceData = response
            if (+serviceData.EC === 0) {
                toast.success(serviceData.EM);
                history.push("/login")

            } else {
                toast.error(serviceData.EM)

            }

        }
    }
    return (
        <div className="register-container">
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
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'} placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="number" className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'} placeholder="Phone" value={phone} onChange={(event) => setPhone(event.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className={objCheckInput.isValidUsername ? 'form-control' : 'form-control is-invalid'} placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'} placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'} placeholder="Confirm Password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}></input>
                        </div>

                        <button className="btn btn-primary" onClick={() => handleRegister()}>Register</button>

                        <hr />
                        <div className="text-center" >

                            <button className="btn btn-success" onClick={() => HandleLoginPage()}>
                                Already've an account. Login
                            </button>
                        </div>


                    </div>

                </div>
            </div>
        </div>

    );
}
export default Register;