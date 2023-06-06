import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignupFormPage from './components/SignupFormModal';
import Navigation from './components/Navigation';
import Custom404 from './components/Custom404';
import * as sessionActions from './store/session';
import SpotsIndex from './components/SpotsIndex';
import SpotDetails from './components/SpotDetails';
import CreateSpotForm from './components/CreateSpotForm';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route exact path='/' component={SpotsIndex} />
        <Route exact path='/spots/create' component={CreateSpotForm} />
        <Route exact path ='/spots/:spotId' component={SpotDetails} />
        <Custom404 />
      </Switch>
    </>
  );
}

export default App;
