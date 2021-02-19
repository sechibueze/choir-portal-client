import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Authenticate from './_utils/Authenticate';
import { API_BASE_URL } from './constants';
import './Root.scss';
import { 
  Home,
  OnBoard,
  Login,
  ForgotPassword,
  ResetPassword,
  Dashboard,
  NotFound
} from './pages';

// import { loadCurrentMember } from './_actions/authActions';
import store from './store';
const client = new ApolloClient({
  uri: `${API_BASE_URL}/graphql`,
  cache: new InMemoryCache()
})

// import VerifyAccessId from './components/Auth/VerifyAccessId';
// import AccessAdmin from './components/AccessAdmin/AccessAdmin';
// import ShilohAttendeeRecord from './components/Shiloh/ShilohAttendeeRecord';
// import ShilohManager from './components/Shiloh/ShilohManager';
// store.dispatch(loadCurrentMember());

const App = () => {
  
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/onborad' component={OnBoard} />
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          {/* <Route exact path='/grantaccess' component={Access} /> */}
          <Route exact path='/forgot-password' component={ForgotPassword} />
          <Route path='/password-reset/:token?' component={ResetPassword} />
          <Authenticate path='/dashboard' component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
          
      </Router>
    </Provider>
    </ApolloProvider>
  );
};

export default App;
