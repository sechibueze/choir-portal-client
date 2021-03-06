import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Authenticate from './_utils/Authenticate';

import {  
  Home,
  Login,
  Start,
  ForgotPassword,
  ResetPassword,
  Dashboard,
  Members,
  ProfilesList,
  NotFound,
  Profile
} from "./pages";
import "./Root.scss";
import { loadCurrentMember } from './_actions/authActions';
import store from './store';
// import VerifyAccessId from './components/Auth/VerifyAccessId';
// import AccessAdmin from './components/AccessAdmin/AccessAdmin';
// import ShilohAttendeeRecord from './components/Shiloh/ShilohAttendeeRecord';
// import ShilohManager from './components/Shiloh/ShilohManager';
// import Members from './pages/Members';
store.dispatch(loadCurrentMember());

const App = () => {
  
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/grantaccess' component={Start} />
          <Route exact path='/forgot-password' component={ForgotPassword} />
          <Route path='/password-reset/:token?' component={ResetPassword} />
           
          {/* <Route exact path='/auth' component={VerifyAccessId} /> */}
          <Route exact path='/login' component={Login} />
          {/* <Route exact path='/signup/:accessId' component={Signup} /> */}
          <Authenticate exact path='/dashboard' component={Dashboard} />
          <Authenticate exact path='/members' component={Members} />
          <Authenticate exact path='/profiles-list' component={ProfilesList} />
          <Authenticate exact path='/profile/:_id?' component={Profile} />
          {/* <Authenticate exact path='/posts' component={PostPage} /> */}
          {/* <Authenticate exact path='/post-admin' component={PostAdmin} /> */}
          {/* <Authenticate exact path='/access-admin' component={AccessAdmin} /> */}
          {/* <Authenticate exact path='/shiloh-attendee' component={ShilohAttendeeRecord} /> */}
          {/* <Authenticate exact path='/shiloh-manager' component={ShilohManager} /> */}
          <Route component={NotFound} />

          {/* <div className="footer" style={{ backgroundColor: '#333'}}>
            <p> Powered by: <a style={{color: '#fff'}} href="https://ftwinnersictg.org" target="_blank">
              <img src="./img/ictg-logo.png" alt="developer logo"/>
              ICTGroup </a></p>
          </div> */}
          
        </Switch>
          
      </Router>
    </Provider>
  );
};

export default App;
