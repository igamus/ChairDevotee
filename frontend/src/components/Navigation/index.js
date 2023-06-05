import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';
import ProfileButton from './ProfileButton.js';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <nav>
            <NavLink exact to='/' className='logo'>Share VIP</NavLink>
            {isLoaded && (
                <ProfileButton user={sessionUser} className='profile' />
            )}
        </nav>
    );
}

export default Navigation;
