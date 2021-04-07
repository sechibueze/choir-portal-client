import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Modal from "../../components/Modal";
import AuthContainer from "../../components/AuthContainer";
import ShilohSignupForm from "../../components/ShilohSignupForm";
import EditShilohRegistrationForm from "../../components/EditShilohRegistrationForm";
import Alert from "../../components/Alert";
import {
  EDIT_SHILOH_SUCCESS,
  SHILOH_SIGNUP_SUCCESS,
} from "../../_actions/types";
import {
  getShilohRegistration,
  resetShilohData,
} from "../../_actions/shilohActions";
import ShowShilohData from "../../components/ShowShilohData";
const ShilohInfo = ({
  shilohSignup,
  getShilohRegistration,
  currentMember,
  shilohData,
  shilohDataRequest,
  shilohDataUpdate,
  resetShilohData,
}) => {
  const [shilohSignupState, setShilohSignupState] = useState(false);
  const [shilohUpdateState, setShilohUpdateState] = useState(false);

  const dismissModalAndResetData = () => {
    setShilohSignupState(false);
    setShilohUpdateState(false);
    resetShilohData();
  };

  const _dismissModalAndResetData = () => {
    if (shilohSignup || shilohDataUpdate) {
      dismissModalAndResetData();
    }
  };
  useEffect(_dismissModalAndResetData, [
    shilohSignup,
    shilohDataUpdate,
    _dismissModalAndResetData,
  ]);

  const _getShilohRegistration = () =>
    getShilohRegistration({ access: currentMember.access });
  useEffect(_getShilohRegistration, [
    shilohSignup,
    shilohDataUpdate,
    currentMember.access,
    getShilohRegistration,
  ]);

  return (
    <AuthContainer>
      <div className="context-box">
        {shilohDataRequest && !shilohData ? (
          <span> loading...</span>
        ) : !shilohDataRequest && !shilohData ? (
          <span
            className="context-action"
            onClick={() => setShilohSignupState(true)}
          >
            <span className="fa fa-user-plus" /> <span>Register</span>
          </span>
        ) : (
          <span
            className="context-action"
            onClick={() => setShilohUpdateState(true)}
          >
            <span className="fa fa-user-plus" /> <span>Edit</span>
          </span>
        )}

        {/* <span className="context-action" onClick={() => setMembersUploadState(true)}> <span className="fas fa-paperclip" /> Upload Members </span> */}
      </div>
      <Alert origin={SHILOH_SIGNUP_SUCCESS} />
      <Alert origin={EDIT_SHILOH_SUCCESS} />

      {shilohSignupState && (
        <Modal
          component={<ShilohSignupForm />}
          visible={shilohSignupState}
          dismiss={() => dismissModalAndResetData()}
        />
      )}
      {shilohUpdateState && (
        <Modal
          component={<EditShilohRegistrationForm registration={shilohData} />}
          visible={shilohUpdateState}
          dismiss={() => dismissModalAndResetData()}
        />
      )}

      <div className="container">
        {shilohDataRequest && !shilohData ? (
          <span>loading</span>
        ) : !shilohDataRequest && !shilohData ? (
          <span
            className="context-action"
            onClick={() => setShilohSignupState(true)}
          >
            <span className="fa fa-user-plus" /> <span>Register</span>
          </span>
        ) : (
          shilohData && <ShowShilohData shilohData={shilohData} />
        )}
      </div>
    </AuthContainer>
  );
};
ShilohInfo.propTypes = {
  shilohSignup: PropTypes.object,
};
const mapStateToProps = (state) => ({
  shilohSignup: state.shiloh.shilohSignup,
  shilohData: state.shiloh.shilohData,
  shilohDataUpdate: state.shiloh.shilohDataUpdate,
  shilohDataRequest: state.shiloh.shilohDataRequest,
  currentMember: state.auth.currentMember,
});
export default connect(mapStateToProps, {
  getShilohRegistration,
  resetShilohData,
})(ShilohInfo);
