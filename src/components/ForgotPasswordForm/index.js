import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Alert from "../Alert";
import { sendPasswordResetToken } from "../../_actions/memberActions";
import {
  PASSWORD_TOKEN_FAIL,
  PASSWORD_TOKEN_SUCCESS,
} from "../../_actions/types";

const ForgotPasswordForm = ({
  sendPasswordResetToken,
  passwordTokenRequest,
}) => {
  const [data, setData] = useState({ email: "" });

  const handleChange = ({ target }) => {
    setData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };
  const handleForgotPassword = (e) => {
    e.preventDefault();
    sendPasswordResetToken(data);
  };

  const { email } = data;
  return (
    <Fragment>
      <div className="container">
        <form className="form" onSubmit={handleForgotPassword}>
          <Alert origin={PASSWORD_TOKEN_FAIL} />
          <Alert origin={PASSWORD_TOKEN_SUCCESS} />
          <div className="form-group">
            <label htmlFor="email">
              Email <sup>*</sup>
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="form-control"
              placeholder="jkevin@scott.com"
              id="email"
              required
            />
          </div>
          <button className="btn btn-success btn-md fa fa-check">
            {passwordTokenRequest
              ? "processing..."
              : "Send Password Reset Link"}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

ForgotPasswordForm.propTypes = {
  sendPasswordResetToken: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  passwordTokenRequest: state.members.passwordTokenRequest,
});
export default connect(mapStateToProps, { sendPasswordResetToken })(
  ForgotPasswordForm
);
