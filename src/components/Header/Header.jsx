import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import "./header.scss"
import { useDispatch, useSelector } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';
import { logout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import { Language } from './Language';

const Header = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated) // state.user - ở rootReducer. isAuthenticated ở userReducer : Lấy giá trị biến isAuthenticated ở userReducer

    const account = useSelector(state => state.user.account)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleLogin = () => {
        navigate("/login")
    }

    const handleLogout = async () => {
        let response = await logout("account.email", account.refresh_token)
        if (response && response.EC === 0) {
            // clear data redux
            dispatch(doLogout())
            navigate('/login');
        } else {
            toast.error(response.EM);
        }
    }

    return (
        <Navbar expand="lg" className="bg-light header__navbar">
            <Container>
                <NavLink to="/" className='navbar-brand mb-0 h1'>React-Intern</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* Link để trang web k reload lại trang | NavLink để khi click vào thẻ a nào đó sẽ add class active sáng thẻ a đó và cũng k bị reload trang */}
                        <NavLink to="/" className='nav-link'>Home</NavLink>
                        <NavLink to="/user" className='nav-link'>User</NavLink>
                        <NavLink to="/admin" className='nav-link'>Admin</NavLink>
                    </Nav>

                    {/* Menu Down */}
                    <Nav className='d-flex gap-2'>

                        <Language />

                        {isAuthenticated === false
                            ?
                            <>
                                <button className='btn__login' onClick={() => handleLogin()}>Login</button>
                                <button className='btn__signup' onClick={() => { navigate("/register") }}>Signup</button>
                            </>
                            :
                            <NavDropdown title="Setting" id='basic-nav-dropdown'>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;