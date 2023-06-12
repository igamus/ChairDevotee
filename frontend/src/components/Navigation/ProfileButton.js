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
        <div className='profile-button'>
            <button onClick={openMenu} className='pb-button'>
                <i className='fa-solid fa-bars' />
                <i className="fa-solid fa-user" />
            </button>
            <div className={divClassName} ref={divRef}>
                {
                    user ? (
                        <>
                        Hello, {user.firstName}<br/>
                        {user.email}<br/>
                        <hr />
                        <Link to='/spots/current' onClick={closeMenu}>Manage Spots</Link>
                        <hr />
                        <button className='profile-logout' onClick={logout}>Log Out</button>
                        </>
                    ) : (
                        <>
                            <OpenModalMenuItem
                                className='signup-modal'
                                itemText='Sign up'
                                onButtonClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                            <OpenModalMenuItem
                                className='login-modal'
                                itemText='Log in'
                                onButtonClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default ProfileButton;
