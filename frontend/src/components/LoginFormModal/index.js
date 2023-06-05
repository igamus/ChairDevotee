/* TODO:
    - input validation
    - prevent button press when errors exist
    - add display for that
    - css
*/

import { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true);
    const { closeModal } = useModal();

    useEffect(() => {
        setErrors(errors)
    }, [errors])

    useEffect(() => {
        if (credential.length >= 4 && password.length >= 6) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [credential, password])

    const handleSubmit = e => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
        .then(closeModal)
        .catch(
            async res => {
                const data = await res.json(); // is this superfluous and handled in the thunk?
                if (data && data.errors) {
                    setErrors(data.errors)
                };
            }
        );
    };

    const onDemoClick = e => {
        e.preventDefault();
        return dispatch(sessionActions.login({
            credential: "el_poeta",
            password: "password5"
        }))
        .then(closeModal)
        .catch(
            async res => {
                setErrors({credential: 'Error logging in the demo user'})
            }
        )
    }

    return (
        <div className='login'>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <p className='error'>{errors.credential}</p>
                <label>
                    <input
                        placeholder='Username or Email'
                        type='text'
                        value={credential}
                        onChange={e => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        placeholder='Password'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button className='login-button' type='submit' disabled={disabled}>Log In</button>
                <button className='demo-button' type='button' onClick={onDemoClick}>Demo User</button>
            </form>
        </div>
    )
}

export default LoginFormModal;
