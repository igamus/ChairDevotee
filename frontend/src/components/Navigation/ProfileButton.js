import { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css';
import OpenModalMenuItem from '../OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const divRef = useRef();
    const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = e => {
            if (!divRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = e => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu()
        history.push('/');
    };

    const divClassName = 'profile-dropdown' + (showMenu ? "" : " hidden");

    return (
        <div id='profile-button-container'>
            <button onClick={openMenu} id='pb'>
                <i className='fa-solid fa-bars' />
                <i className="fa-solid fa-user" />
            </button>
            <div className={divClassName} ref={divRef}>
                {
                    user ? (
                        <>
                        <div id='dropdown-text'>
                            Hello, {user.firstName}<br/>
                            {user.email}<br/>
                            <hr />
                            <Link to='/reviews/current' onClick={closeMenu}>Manage Reviews</Link>
                            <Link to='/spots/current' onClick={closeMenu}>Manage Spots</Link>
                            <Link to='/bookings/current' onClick={closeMenu}>Manage Bookings</Link>
                            <hr />
                        </div>
                        <button className='logout-button' id='profile-logout-button' onClick={logout}>Log Out</button>
                        </>
                    ) : (
                        <div id='dropdown-text'>
                            <OpenModalMenuItem
                                id='signup-modal-button'
                                itemText='Sign up'
                                onButtonClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                            <OpenModalMenuItem
                                id='login-modal-button'
                                itemText='Log in'
                                onButtonClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ProfileButton;
