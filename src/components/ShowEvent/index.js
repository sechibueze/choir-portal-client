import React from "react";
import moment from "moment";
import ShowAttendees from "../ShowAttendees";

const ShowEvent = ({ event }) => {
  const {
    name,
    category,
    caption,
    event_date,
    createdAt,
    updatedAt,
    attendance,
  } = event;
  return (
    <div className="data container">
      <h3> Event Details </h3>
      <div className="data-field">
        <strong className="data-key">Name </strong>
        <article className="data-value"> {name && name} </article>
      </div>
      <div className="data-field">
        <strong className="data-key">Schedule </strong>
        <article className="data-value">
          {" "}
          {event_date && moment(event_date).format("DD-MM-YYYY")}{" "}
        </article>
      </div>
      <div className="data-field">
        <strong className="data-key">Category </strong>
        <article className="data-value"> {category && category} </article>
      </div>
      <div className="data-field">
        <strong className="data-key">Caption </strong>
        <article className="data-value"> {caption && caption} </article>
      </div>
      <div className="data-field">
        <strong className="data-key">Created Date </strong>
        <article className="data-value">
          {" "}
          {createdAt && moment(createdAt).format("DD-MM-YYYY")}{" "}
        </article>
      </div>
      <div className="data-field">
        <strong className="data-key">Last updated </strong>
        <article className="data-value">
          {" "}
          {updatedAt && moment(updatedAt).format("DD-MM-YYYY")}{" "}
        </article>
      </div>
      {attendance.length > 0 ? (
        <ShowAttendees attendance={attendance} />
      ) : (
        <h4> No Attendance for this event yet </h4>
      )}
    </div>
  );
};

export default ShowEvent;
