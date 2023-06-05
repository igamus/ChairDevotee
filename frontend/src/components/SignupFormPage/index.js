/* TODO:
    - input validation
    - prevent button press when errors exist
    - add display for that
    - css
*/

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    if (sessionUser) return <Redirect to='/' />

    const handleSubmit = e => {
        e.preventDefault();
        if (password !== confirmPassword) return setErrors({confirmPassword: 'Passwords must match!'})
        setErrors({});
        return dispatch(sessionActions.signup({ firstName, lastName, email, username, password })).catch(
            async res => {
                const data = await res.json(); // is this superfluous and handled in the thunk?
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name
                    <input
                        type='text'
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Last Name
                    <input
                        type='text'
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Email
                    <input
                        type='text'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Username
                    <input
                        type='text'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Confirm Password
                    <input
                        type='password'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                <button type='submit'>Sign Up</button>
            </form>
        </>
    );
}

export default SignupFormPage;
