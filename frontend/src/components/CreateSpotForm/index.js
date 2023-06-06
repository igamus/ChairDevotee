import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';


function CreateSpotForm() {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    const sessionUser = useSelector(state => state.session.user);

    if (isLoaded && sessionUser === null) return (<Redirect to='/' />)
    return (
        <div>
            Howdy. We're here
        </div>
    );
}

export default CreateSpotForm;
