import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';
import ProfileButton from './ProfileButton.js';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <nav>
            <NavLink exact to='/' id='logo'><i className='fa-solid fa-chair' style={{color: '#ff385c', marginRight: '5px'}} />ChairDevotee</NavLink>

            <div id='nav-right'>
                {sessionUser && (
                    <NavLink id='create-spot-link' to='/spots/create' style={{color: '#00525E'}}>Create a New Spot</NavLink>
                )}

                {isLoaded && (
                    <ProfileButton user={sessionUser} id='profile-dropdown-button' />
                )}
            </div>
        </nav>
    );
}

export default Navigation;
