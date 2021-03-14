import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Authenticate from "./_utils/Authenticate";

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
  Profile,
  Events,
  EventDetails,
  ActivityProfile,
} from "./pages";
import "./Root.scss";
import { loadCurrentMember } from "./_actions/authActions";
import store from "./store";
import { Fragment } from "react";
import Footer from "./components/Footer";
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
        <Fragment>
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/grantaccess" component={Start} />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <Route path="/password-reset/:token?" component={ResetPassword} />
              <Route exact path="/login" component={Login} />
              <Authenticate exact path="/events" component={Events} />
              <Authenticate
                exact
                path="/event-details/:_id"
                component={EventDetails}
              />
              <Authenticate exact path="/dashboard" component={Dashboard} />
              <Authenticate exact path="/members" component={Members} />
              <Authenticate
                exact
                path="/profiles-list"
                component={ProfilesList}
              />
              <Authenticate exact path="/profile/:_id?" component={Profile} />
              <Authenticate
                exact
                path="/activity"
                component={ActivityProfile}
              />
              {/* <Authenticate exact path='/posts' component={PostPage} /> */}
              {/* <Authenticate exact path='/post-admin' component={PostAdmin} /> */}
              {/* <Authenticate exact path='/access-admin' component={AccessAdmin} /> */}
              {/* <Authenticate exact path='/shiloh-attendee' component={ShilohAttendeeRecord} /> */}
              {/* <Authenticate exact path='/shiloh-manager' component={ShilohManager} /> */}
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
