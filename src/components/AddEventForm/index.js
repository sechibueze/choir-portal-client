import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { EVENT_CATEBORIES } from "../../constants";

import Alert from "../Alert";
import { setAlert } from "../../_actions/alertActions";
import { createEvent } from "../../_actions/eventsActions";
import { CREATE_EVENT_FAIL } from "../../_actions/types";

const AddEventForm = ({ createEvent, newEventRequest }) => {
  const [data, setData] = useState({
    name: "",
    event_date: "",
    category: "",
    caption: "",
  });

  const handleChange = ({ target }) => {
    setData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createEvent(data);
  };

  const { name, caption, category } = data;

  return (
    <Fragment>
      <section className="section">
        <header className="section-header">
          <h3 className="title">New Event </h3>
        </header>
        <form className="form" onSubmit={handleSubmit}>
          <Alert origin={CREATE_EVENT_FAIL} />
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              onChange={handleChange}
              value={category}
              id="category"
              className="form-control"
            >
              <option selected value="">
                --select--
              </option>
              {EVENT_CATEBORIES.map((category, idx) => (
                <option value={category} key={idx}>
                  {`${category}`}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="event_date">Event date</label>
            <input
              type="date"
              name="event_date"
              onChange={handleChange}
              id="event_date"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="caption">Caption</label>
            <textarea
              cols={20}
              rows={5}
              name="caption"
              value={caption}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-sm btn-primary fa fa-check">
            {newEventRequest ? "processing..." : "New Event"}
          </button>
        </form>
      </section>
    </Fragment>
  );
};

AddEventForm.propTypes = {
  createEvent: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  currentMember: state.auth.currentMember,
  newEventRequest: state.events.newEventRequest,
});
export default connect(mapStateToProps, { setAlert, createEvent })(
  AddEventForm
);
