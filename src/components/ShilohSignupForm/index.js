import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Alert from "../Alert";
import { registerForShiloh } from "../../_actions/shilohActions";
import { SHILOH_SIGNUP_FAIL } from "../../_actions/types";
import { setAlert } from "../../_actions/alertActions";

const ShilohSignupForm = ({ setAlert, registerForShiloh }) => {
  const [data, setData] = useState({
    accomodation: "",
    parentChecked: false,
    availability: [
      {
        id: 1,
        day: "Tuesday",
        isChecked: false,
      },
      {
        id: 2,
        day: "Wednesday",
        isChecked: false,
      },
      {
        id: 3,
        day: "Thursday",
        isChecked: false,
      },
      {
        id: 4,
        day: "Friday",
        isChecked: false,
      },
      {
        id: 5,
        day: "Saturday",
        isChecked: false,
      },
    ],
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleParentSelection = ({ target }) => {
    const { checked } = target;
    const updatedAvailability = data.availability.map((day) => {
      day.isChecked = checked;
      return day;
    });
    setData((prev) => ({
      ...prev,
      availability: updatedAvailability,
      parentChecked: checked,
    }));
  };
  const handleChildSelection = ({ target }) => {
    const { id } = target;
    const updatedAvailability = data.availability.map((day) => {
      if (day.id === id) {
        day.isChecked = !day.isChecked;
      }
      return day;
    });
    setData((prev) => ({
      ...prev,
      availability: updatedAvailability,
      parentChecked: data.availability.every((day) => day.isChecked === true),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { accomodation, availability } = data;
    const availabilePeriods = availability.filter(
      (day) => day.isChecked === true
    );
    const shiloh = {
      availability: availabilePeriods.map((p) => p.day),
      accomodation,
    };
    if (!accomodation || shiloh.availability.length < 1) {
      return setAlert("All fields are required", SHILOH_SIGNUP_FAIL);
    }
    return registerForShiloh(shiloh);
  };
  const { parentChecked } = data;
  return (
    <Fragment>
      <form name="personal" onSubmit={handleSubmit} className="form">
        <Alert origin={SHILOH_SIGNUP_FAIL} />
        <div className="form-group">
          <label htmlFor="accomodation">Accomodation</label>
          <select
            name="accomodation"
            onChange={handleChange}
            required
            id="accomodation"
            className="form-control"
          >
            <option value="" selected>
              {" "}
              ---select---{" "}
            </option>
            <option value="YES"> YES </option>
            <option value="NO"> NO </option>
          </select>
        </div>
        <div className="form-group">
          <label>Availability</label>
          <label htmlFor="parent">
            <input
              name="parent"
              id="parent"
              checked={parentChecked}
              type="checkbox"
              onChange={handleParentSelection}
              className="form-control0"
            />
            Un/Check All
          </label>

          {data.availability.map((presence) => {
            const { id, day, isChecked } = presence;
            return (
              <label htmlFor={id}>
                <input
                  key={id}
                  name={day}
                  checked={isChecked}
                  value={day}
                  id={id}
                  type="checkbox"
                  onChange={handleChildSelection}
                  className="form-control0"
                />
                {day && day.toUpperCase()}
              </label>
            );
          })}
        </div>

        <button type="submit" className="btn btn-primary p-1">
          {" "}
          Register{" "}
        </button>
      </form>
    </Fragment>
  );
};

ShilohSignupForm.propTypes = {
  registerForShiloh: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  shilohSignupRequest: state.shiloh.shilohSignupRequest,
  shilohSignup: state.shiloh.shilohSignup,
  currentMember: state.auth.currentMember,
});
export default connect(mapStateToProps, { registerForShiloh, setAlert })(
  ShilohSignupForm
);
