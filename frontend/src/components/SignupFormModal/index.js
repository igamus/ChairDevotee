/* TODO:
    - input validation
    - prevent button press when errors exist
    - add display for that
    - css
*/

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true);
    const { closeModal } = useModal();

    useEffect(() => {
        if (
            firstName.length &&
            lastName.length &&
            email.length &&
            username.length &&
            password.length &&
            confirmPassword.length
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [firstName, lastName, email, username, password, confirmPassword]) // there's probably a better way that takes advantage of our existing listeners

    const handleSubmit = e => {
        e.preventDefault();
        if (password !== confirmPassword) return setErrors({confirmPassword: 'Passwords must match!'})
        setErrors({});
        return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
        .then(closeModal)
        .catch(
            async res => {
                const data = await res.json(); // is this superfluous and handled in the thunk?
                if (data && data.errors) {
                    // console.log('data:', data);
                    setErrors(data.errors);
                }
                console.log('errors:', errors);
            }
        );
    };

    return (
        <div className='signup'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <p className='error'>
                    {errors.confirmPassword}
                    {errors.undefined}
                    {/* {errors.confirmPassword}
                    {errors.email}
                    {errors.username}
                    {errors.firstName}
                    {errors.lastName} */}
                </p>
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
                        type='email'
                        value={email} // for stylistic consistency it may be better to hardcode this error rather than let it be caught by HTTP
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
                <button type='submit' disabled={disabled}>Sign Up</button>
            </form>
        </div>
    );
}

export default SignupFormModal;
