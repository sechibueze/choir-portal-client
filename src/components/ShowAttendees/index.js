import React from "react";
import "./ShowAttendees.scss";
const ShowAttendance = ({ attendance }) => {
  return (
    <div className="">
      <h4> Attendance {attendance.length} </h4>
      {attendance.map((attendee, idx) => {
        const { _id, location, access, firstname, lastname } = attendee;
        return (
          <div className="data-card" key={_id}>
            <strong className="data-id"> {++idx} </strong>
            <article className="data-fields">
              {" "}
              <p className="data-info">
                {" "}
                <span className="fas fa-user" /> {firstname && firstname}{" "}
                {lastname && lastname}{" "}
              </p>
              <div className="meta-data">
                <small>
                  {" "}
                  <span className="fas fa-key" /> {access && access}{" "}
                </small>
                <small>
                  {" "}
                  <span className="fas fa-map-marker-alt" />{" "}
                  {location && location}{" "}
                </small>
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
};

export default ShowAttendance;
