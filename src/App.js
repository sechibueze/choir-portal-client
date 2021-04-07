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
  Posts,
  ShilohInfo,
  ShilohManager,
} from "./pages";
import "./Root.scss";
import { loadCurrentMember } from "./_actions/authActions";
import store from "./store";
import { Fragment } from "react";
import Footer from "./components/Footer";
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
              <Authenticate exact path="/shiloh-info" component={ShilohInfo} />
              <Authenticate
                exact
                path="/shiloh-manager"
                component={ShilohManager}
              />
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
              <Authenticate exact path="/posts" component={Posts} />
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
