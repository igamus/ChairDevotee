import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';
import ProfileButton from './ProfileButton.js';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <nav>
            <NavLink exact to='/' className='logo'><i className='fa-brands fa-airbnb' />Share VIP</NavLink>

            <div className='nav-right'>
                {sessionUser && (
                    <NavLink to='/spots/create'>Create a New Spot</NavLink>
                )}

                {isLoaded && (
                        <ProfileButton user={sessionUser} className='profile' />
                )}
            </div>
        </nav>
    );
}

export default Navigation;
