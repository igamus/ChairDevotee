import { useState, useEffect, useRef } from 'react';
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
        closeMenu();
    };

    const divClassName = 'profile-dropdown' + (showMenu ? "" : " hidden");

    return (
        <div>
            <button onClick={openMenu}>
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
                        <a>Manage Spots</a>
                        <hr />
                        <button className='profile-logout' onClick={logout}>Log Out</button>
                        </>
                    ) : (
                        <>
                            <OpenModalMenuItem
                                itemText='Log in'
                                onButtonClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                            <OpenModalMenuItem
                                itemText='Sign up'
                                onButtonClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default ProfileButton;
