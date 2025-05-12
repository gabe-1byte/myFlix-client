import {Navbar, Container, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navigation-bar.scss';

export const NavigationBar = ({ user, onLoggedOut }) => {
    return (
        <Navbar expand='lg'>
            <Container>
                <Navbar.Brand as={Link} to='/'>
                    MyFlix App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        {!user && (
                            <>
                                <Nav.Link as={Link} to='/login'>
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to='/users'>
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to='/'>
                                    Home
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>
                                    Logout
                                </Nav.Link>
                                <Nav.Link as={Link} to={`/users/${user.name}`}>
                                    Profile
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};