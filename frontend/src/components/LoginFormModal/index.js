import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true);
    const { closeModal } = useModal();

    useEffect(() => {
        setErrors(errors);
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
        .then(closeModal).then(history.push('/'))
        .catch(async res => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                };
            }
        );
    };

    const onDemoClick = e => {
        e.preventDefault();
        return dispatch(sessionActions.login({
            credential: 'demo_user',
            password: 'password6'
        })).then(closeModal).then(history.push('/'))
        .catch(async res => setErrors({credential: 'Error logging in the demo user'}))
    };

    return (
        <div className='modal-interior' id='login'>
            <h1>Log In</h1>
            <form id='login-form' onSubmit={handleSubmit}>
                <p className='error' id='login-error'>{errors.credential}</p>
                <div id='login-labels'>
                    <label>
                        <input
                            placeholder='Username or Email'
                            type='text'
                            value={credential}
                            onChange={e => setCredential(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <button className='primary-button' id='login-button' type='submit' disabled={disabled}>Log In</button>
                <button id='demo-button' type='button' onClick={onDemoClick}>Demo User</button> {/* TODO: Make text only clickable part of the button */}
            </form>
        </div>
    )
}

export default LoginFormModal;
