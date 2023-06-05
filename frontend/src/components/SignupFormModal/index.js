/* TODO:
    - input validation
    - prevent button press when errors exist
    - add display for that
    - css
*/

import { useState } from 'react';
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
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { closeModal } = useModal();

    const handleSubmit = e => {
        e.preventDefault();
        setHasSubmitted(true);
        if (password !== confirmPassword) return setErrors({confirmPassword: 'Passwords must match!'})
        setErrors({});
        return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
        .then(closeModal)
        .catch(
            async res => {
                const data = await res.json(); // is this superfluous and handled in the thunk?
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };

    return (
        <div className='signup'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                {hasSubmitted && errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
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
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
}

export default SignupFormModal;
