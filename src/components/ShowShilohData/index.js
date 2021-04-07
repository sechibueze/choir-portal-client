import React, { Fragment } from "react";

const ShowShilohData = ({ shilohData }) => {
  const {
    member: { firstname, lastname, email },
    availability,
    accomodation,
    otp,
    access,
  } = shilohData;

  return (
    <Fragment>
      <section className="section">
        <header className="section-header">
          <h2 className="title"> Shiloh Registration Data</h2>
        </header>

        <div className="data">
          <div className="data-field">
            <span className="data-key"> Access ID </span>
            <article className="data-value"> {access && access} </article>
          </div>
          <div className="data-field">
            <span className="data-key">Firstname </span>
            <article className="data-value"> {firstname && firstname} </article>
          </div>

          <div className="data-field">
            <span className="data-key">Lastname </span>
            <article className="data-value"> {lastname && lastname} </article>
          </div>
          <div className="data-field">
            <span className="data-key">Email </span>
            <article className="data-value"> {email && email} </article>
          </div>
          <div className="data-field">
            <span className="data-key">Availability </span>
            <article className="data-value">
              {" "}
              {availability && availability.join()}{" "}
            </article>
          </div>
          <div className="data-field">
            <span className="data-key">Accomodation </span>
            <article className="data-value">
              {" "}
              {accomodation && accomodation}{" "}
            </article>
          </div>
          <div className="data-field">
            <span className="data-key">OTP </span>
            <article className="data-value"> {otp && otp} </article>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ShowShilohData;
