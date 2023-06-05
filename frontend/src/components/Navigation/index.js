import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';
import ProfileButton from './ProfileButton.js';
import OpenModalButton from '../OpenModalButon/index.js';
import LoginFormModal from '../LoginFormModal/index.js';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <li>
                <ProfileButton user={sessionUser} />
            </li>
        );
    } else {
        sessionLinks = (
            <li>
                <OpenModalButton
                    buttonText='Log In'
                    modalComponent={<LoginFormModal />}
                />
                <NavLink to='/signup'>Sign Up</NavLink>
            </li>
        )
    }

    return (
        <ul>
            <li>
                <NavLink exact to='/'>Home</NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
    );
}

export default Navigation;
