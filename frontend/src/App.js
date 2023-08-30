import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navigation from './components/Navigation';
import Custom404 from './components/Custom404';
import * as sessionActions from './store/session';
import SpotsIndex from './components/SpotsIndex';
import SpotDetails from './components/SpotDetails';
import CreateSpotForm from './components/CreateSpotForm';
import ManageSpots from './components/ManageSpots';
import UpdateSpotForm from './components/UpdateSpotForm';
import ManageReviews from './components/ManageReviews';
import ManageBookings from './components/ManageBookings';
import ManageSpotBookings from './components/ManageSpotBookings';
import Footer from "./components/Footer";
import FilterParamsProvider from './context/FilterParams';

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
        <FilterParamsProvider>
          <Route exact path='/' component={SpotsIndex} />
        </FilterParamsProvider>
        <Route exact path='/bookings/current' component={ManageBookings} />
        <Route exact path='/reviews/current' component={ManageReviews} />
        <Route exact path='/spots/current' component={ManageSpots} />
        <Route exact path='/spots/create' component={CreateSpotForm} />
        <Route exact path='/spots/:spotId' component={SpotDetails} />
        <Route exact path='/spots/:spotId/bookings' component={ManageSpotBookings} />
        <Route exact path='/spots/:spotId/edit' component={UpdateSpotForm} />
        <Custom404 />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
