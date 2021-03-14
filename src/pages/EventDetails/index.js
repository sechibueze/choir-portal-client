import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AuthContainer from "../../components/AuthContainer";
import ShowEvent from "../../components/ShowEvent";
import { getEventById } from "../../_actions/eventsActions";
import { setAlert } from "../../_actions/alertActions";

import Alert from "../../components/Alert";
// import Spinner from "../../components/Spinner";

import { GET_EVENT_SUCCESS } from "../../_actions/types";

const EventDetails = ({
  singleEvent,
  singleEventRequest,
  getEventById,
  match,
}) => {
  const getEvent = () => getEventById(match.params._id);
  useEffect(getEvent, [match]);

  return (
    <Fragment>
      <AuthContainer>
        <Alert origin={GET_EVENT_SUCCESS} />
        {singleEventRequest && !singleEvent
          ? "processing..."
          : !singleEventRequest && !singleEvent
          ? "No event yet"
          : singleEvent && <ShowEvent event={singleEvent} />}
      </AuthContainer>
    </Fragment>
  );
};

EventDetails.propTypes = {
  getEventById: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  singleEventRequest: state.events.singleEventRequest,
  singleEvent: state.events.singleEvent,
  currentMember: state.auth.currentMember,
});
export default connect(mapStateToProps, {
  setAlert,
  getEventById,
})(EventDetails);
