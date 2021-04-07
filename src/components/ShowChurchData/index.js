import React, { Fragment } from "react";
const ShowChurchInfo = ({ churchData }) => {
  const {
    wsf_status,
    province,
    district,
    zone,
    ordination_year,
    lfc_joined_year,
    holy_spirit_year,
    new_birth_year,
  } = churchData;
  return (
    <Fragment>
      <section className="section">
        <header className="section-header">
          <h2 className="title"> Church Data</h2>
        </header>
        <div className="data">
          <div className="data-field">
            <strong className="data-key">WSF Status </strong>
            <article className="data-value">
              {" "}
              {wsf_status && wsf_status}{" "}
            </article>
          </div>
          <div className="data-field">
            <strong className="data-key">New birth year </strong>
            <article className="data-value">
              {" "}
              {new_birth_year && new_birth_year}{" "}
            </article>
          </div>
          <div className="data-field">
            <strong className="data-key">Holy Spirit year </strong>
            <article className="data-value">
              {" "}
              {holy_spirit_year && holy_spirit_year}{" "}
            </article>
          </div>
          <div className="data-field">
            <strong className="data-key">Date Joined LFC </strong>
            <article className="data-value">
              {" "}
              {lfc_joined_year && lfc_joined_year}{" "}
            </article>
          </div>
          <div className="data-field">
            <strong className="data-key">Ordination year </strong>
            <article className="data-value">
              {" "}
              {ordination_year && ordination_year}{" "}
            </article>
          </div>

          <div className="data-field">
            <strong className="data-key">Province</strong>
            <article className="data-value"> {province && province} </article>
          </div>

          <div className="data-field">
            <strong className="data-key"> District </strong>
            <article className="data-value"> {district && district} </article>
          </div>

          <div className="data-field">
            <strong className="data-key"> Zone </strong>
            <article className="data-value"> {zone && zone} </article>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ShowChurchInfo;
