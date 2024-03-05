import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getGroup, createNewUser, updateUser } from '../../Services/userService';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash'
const ModalUser = (props) => {
    const [userGroups, setUserGroups] = useState([]);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [sex, setSex] = useState("");
    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: ''

    }



    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true
    }
    const [userData, setUserDate] = useState(defaultUserData)
    const [validInputs, setValidInputs] = useState(validInputsDefault)
    useEffect(() => {
        getGroups();

    }, [])
    useEffect(async () => {

        if (props.action === "UPDATE") {
            setUserDate({ ...props.dataModelUser, group: props.dataModelUser.Group ? props.dataModelUser.Group.id : "" });
        }
        else {
            setUserDate(defaultUserData);
        }
        await props.fetchUsers()

    }, [props.dataModelUser])
    const getGroups = async () => {
        let res = await getGroup();
        if (res && +res.EC === 0) {
            setUserGroups(res.DT)
            if (res.DT && res.DT.length > 0) {
                let groups = res.DT;
                setUserDate({ ...userData, group: groups[0].id })
            }

        } else {
            toast.error(res.EM);
        }
    }
    const handleOnchangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserDate(_userData);
    }
    const checkValidateInputs = () => {

        if (props.action === 'UPDATE') return true;
        setValidInputs(validInputsDefault)
        let arr = ['email', 'phone', 'username', 'password', 'address',]
        let check = true;
        for (let u = 0; u < arr.length; u++) {
            if (!userData[arr[u]]) {
                toast.error(`Empty input ${arr[u]}`);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[u]] = false;
                setValidInputs(_validInputs);
                check = false;
                break;
            }
            else {
                if (arr[u] === 'email') {
                    const res = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    if (!res.test(userData[arr[u]])) {
                        toast.error("sai định dạng gmail")
                        let _validInputs = _.cloneDeep(validInputsDefault);
                        _validInputs[arr[u]] = false;
                        setValidInputs(_validInputs);
                    }

                }
            }
        }
        return check;
    }
    const handleConfirmUser = async () => {

        console.log("check action: ", props.action)
        let check = checkValidateInputs()
        if (check === true) {
            let res = null;
            if (props.action === 'CREATE') {
                res = await createNewUser({ ...userData, groupId: userData['group'] })
            } else {
                res = await updateUser({ ...userData, groupId: userData['group'] })
            }

            // let res = props.action === 'CREATE' ?
            //     await createNewUser({ ...userData, groupId: userData['group'] })
            //     :
            //     await updateUser({ ...userData, groupId: userData['group'] })
            //console.log("check res:", res);
            if (res && res.EC === 0) {
                props.onHide();
                setUserDate(defaultUserData);
                toast.success(res.EM);

            } else {
                toast.error(res.EM);
            }
        }
    }
    return (
        <>
            <Modal size="lg" show={props.show} className='modal-user'>
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{props.action === "CREATE" ? 'Create new user' : 'Edit User'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email (<span className='red'>*</span>) :</label>
                            <input disabled={props.action === "UPDATE" ? true : false} className={validInputs.email ? 'form-control' : 'form-control  is-invalid'} type='email' value={userData.email} onChange={(event) => handleOnchangeInput(event.target.value, "email")} />
                        </div>

                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone Number (<span className='red'>*</span>) :</label>
                            <input disabled={props.action === "UPDATE" ? true : false} className={validInputs.phone ? 'form-control' : 'form-control  is-invalid'} type='text' value={userData.phone} onChange={(event) => handleOnchangeInput(event.target.value, "phone")} />
                        </div>


                        <div className='col-12 col-sm-6 form-group'>
                            <label>Username (<span className='red'>*</span>) :</label>
                            <input className={validInputs.username ? 'form-control' : 'form-control  is-invalid'} type='text' value={userData.username} onChange={(event) => handleOnchangeInput(event.target.value, "username")} />
                        </div>
                        {
                            props.action === "CREATE" &&
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Password (<span className='red'>*</span>) :</label>
                                <input className={validInputs.password ? 'form-control' : 'form-control  is-invalid'} type='password' value={userData.password} onChange={(event) => handleOnchangeInput(event.target.value, "password")} />
                            </div>
                        }

                        <div className='col-12 col-sm-12 form-group'>
                            <label>Address :</label>
                            <input className={validInputs.address ? 'form-control' : 'form-control  is-invalid'} type='text' value={userData.address} onChange={(event) => handleOnchangeInput(event.target.value, "address")} />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Gender :</label>
                            <Form.Select aria-label="Default select example" onChange={(event) => handleOnchangeInput(event.target.value, "sex")} value={userData.sex}  >

                                <option defaultValue="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Group (<span className='red'>*</span>) :</label>
                            <Form.Select aria-label="Default select example" onChange={(event) => handleOnchangeInput(event.target.value, "group")} value={userData.group}>
                                {userGroups && userGroups.length > 0 &&
                                    userGroups.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={props.onHide}>Close</Button>
                    <Button variant='primary' onClick={() => handleConfirmUser()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalUser;