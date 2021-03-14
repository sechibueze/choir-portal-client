import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { uploadAttendance } from "../../_actions/eventsActions";
import { UPLOAD_ATTENDANCE_FAIL } from "../../_actions/types";

import Alert from "../Alert";

const AttendanceUploadform = ({
  uploadAttendance,
  newAttendanceRequest,
  event,
}) => {
  const [data, setData] = useState({ attendance: "" });
  const handleChange = ({ target }) => {
    const { name, files } = target;
    setData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("events ", event);
    const fd = new FormData();
    fd.append("attendance", data.attendance);
    fd.append("eventId", event._id);
    uploadAttendance(fd);
  };

  return (
    <Fragment>
      <h1> Upload Attendance </h1>
      <form
        className="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <Alert origin={UPLOAD_ATTENDANCE_FAIL} />
        <div className="form-group">
          <label htmlFor="attendance"> Upload Attendance List</label>
          <input
            type="file"
            required
            name="attendance"
            id="attendance"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          <span className="fas fa-paperclip" />
          {newAttendanceRequest ? "processing..." : "Upload attendance"}
        </button>
      </form>
    </Fragment>
  );
};
AttendanceUploadform.propTypes = {
  uploadAttendance: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  newAttendanceRequest: state.events.newAttendanceRequest,
});
export default connect(mapStateToProps, { uploadAttendance })(
  AttendanceUploadform
);
