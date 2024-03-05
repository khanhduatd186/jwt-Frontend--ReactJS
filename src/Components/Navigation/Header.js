import { useEffect, useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link, useLocation, NavLink } from 'react-router-dom';

import { UserContext } from '../../Context/UserContext';
import { logoutUser } from '../../Services/userService';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
const Header = (props) => {
    const [isShow, setIsShow] = useState(true);
    let location = useLocation();
    const { user, logoutContext } = useContext(UserContext)
    let history = useHistory();
    const handleLogout = async () => {
        let response = await logoutUser()
        console.log("response:", response)
        if (response && +response.EC === 0) {
            let lg = logoutContext();
            console.log("check lg:", lg);

            history.push("/login")
        }
        else {
            toast("logout không thành công")
        }

    }

    if (user && user.isAuthenticated || location.pathname === '/') {
        return (
            <>
                <div className='top-nav'>
                    <Navbar expand="lg" className="bg-body-tertiary" >
                        <Container>
                            <Navbar.Brand href="#home">JWT</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink className="nav-link" to="/">Home</NavLink>
                                    <NavLink className="nav-link" to="/users">User</NavLink>
                                    <NavLink className="nav-link" to="/project">Project</NavLink>
                                    <NavLink className="nav-link" to="/role">Role</NavLink>


                                </Nav>
                                <Nav>
                                    {user && user.isAuthenticated === true ?

                                        <>
                                            <Nav.Item className='nav-link'>
                                                Welcome {user.accout.username}
                                            </Nav.Item>
                                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                                <NavDropdown.Item >
                                                    <span onClick={() => handleLogout()}>
                                                        Logout
                                                    </span>

                                                </NavDropdown.Item>
                                            </NavDropdown>

                                        </>
                                        :
                                        <Link className="nav-link" to="/login">Login</Link>



                                    }


                                </Nav>



                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                </div>


            </>

        );


    }
    else {
        return (<></>)
    }


}
export default Header;