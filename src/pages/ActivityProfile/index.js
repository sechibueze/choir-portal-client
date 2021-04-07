import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AuthContainer from "../../components/AuthContainer";
import { getEventActivity } from "../../_actions/eventsActions";
import { setAlert } from "../../_actions/alertActions";

import Alert from "../../components/Alert";
// import Spinner from "../../components/Spinner";

import { GET_ACTIVITY_SUCCESS } from "../../_actions/types";
import ShowActivityData from "../../components/ShowActivityData";

const ActivityProfile = ({
  activity,
  activityRequest,
  getEventActivity,
  match,
}) => {
  const getEvent = () => getEventActivity();
  useEffect(getEvent, [getEventActivity]);

  return (
    <Fragment>
      <AuthContainer>
        <Alert origin={GET_ACTIVITY_SUCCESS} />
        {activityRequest && !activity
          ? "processing..."
          : !activityRequest && !activity
          ? "No event yet"
          : activity && <ShowActivityData activity={activity} />}
      </AuthContainer>
    </Fragment>
  );
};

ActivityProfile.propTypes = {
  getEventActivity: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  activityRequest: state.events.activityRequest,
  activity: state.events.activity,
  currentMember: state.auth.currentMember,
});
export default connect(mapStateToProps, {
  setAlert,
  getEventActivity,
})(ActivityProfile);
