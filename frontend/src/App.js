import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignupFormPage from './components/SignupFormModal';
import Navigation from './components/Navigation';
import Custom404 from './components/Custom404';
import * as sessionActions from './store/session';
import SpotsIndex from './components/SpotsIndex';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {/* {isLoaded && <Switch>
      </Switch>} */}
      <Switch>
        <Route exact path='/'>
          <SpotsIndex />
        </Route>
        <Custom404 />
      </Switch>
    </>
  );
}

export default App;
