import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { clearAlert } from "../../_actions/alertActions";
import "./Alert.scss";
const Alert = ({ alertBucket, origin, clearAlert }) => {
  const displayAlerts = origin
    ? alertBucket.filter((alert) => alert.origin === origin)
    : alertBucket;
  return (
    <Fragment>
      {displayAlerts.length > 0 &&
        displayAlerts.map((alert) => (
          <div
            key={`${alert.alertId}`}
            className={`mr-1 alert alert-${alert.type ? alert.type : "danger"}`}
          >
            {alert.alertText}
            <span
              className="alert-dismiss fa fa-times-circle"
              onClick={() => clearAlert(alert.alertId)}
            />
          </div>
        ))}
    </Fragment>
  );
};
Alert.propTypes = {
  alertBucket: PropTypes.array.isRequired,
  type: PropTypes.string,
  origin: PropTypes.string,
  clearAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  alertBucket: state.alerts.alertBucket,
});
export default connect(mapStateToProps, { clearAlert })(Alert);
