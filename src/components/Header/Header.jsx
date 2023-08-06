import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from 'react-router-dom';
import "./header.scss"

const Header = () => {
    return (
        <Navbar expand="lg" className="bg-light header__navbar">
            <Container>
                <Link to="/" className='navbar-brand mb-0 h1'>React-Intern</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* Link để trang web k reload lại trang | NavLink để khi click vào thẻ a nào đó sẽ add class active sáng thẻ a đó và cũng k bị reload trang */}
                        <NavLink to="/home" className='nav-link'>Home</NavLink>
                        <NavLink to="/user" className='nav-link'>User</NavLink>
                        <NavLink to="/admin" className='nav-link'>Admin</NavLink>
                    </Nav>

                    {/* Menu Down */}
                    <Nav>
                        <NavDropdown title="User" id="basic-nav-dropdown">
                            <NavDropdown.Item>
                                <Link to="home" className='navbar__item'>Profiles</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item><Link to="home" className='navbar__item'>Login</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to="home" className='navbar__item'>Logout</Link></NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;