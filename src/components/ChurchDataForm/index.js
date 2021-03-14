import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { WSF_STATUS } from "../../constants";

import Alert from "../Alert";
import { setAlert } from "../../_actions/alertActions";
import { updateChurchData } from "../../_actions/profileActions";
import { CHURCH_DATA_FAIL } from "../../_actions/types";

const ChurchDataForm = ({
  _id,
  currentMember,
  churchData,
  updateChurchData,
  churchDataRequest,
}) => {
  const [data, setData] = useState({
    _id: _id && currentMember.auth.includes("admin") ? _id : "",
    wsf_status: churchData.wsf_status ? churchData.wsf_status : "",
    new_birth_year: "",
    holy_spirit_year: "",
    ordination_year: "",
    province: churchData.province ? churchData.province : "",
    district: churchData.district ? churchData.district : "",
    zone: churchData.zone ? churchData.zone : "",
    lfc_joined_year: "",
  });

  const handleChange = ({ target }) => {
    setData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };
  const updateData = (e) => {
    e.preventDefault();
    updateChurchData(data);
  };

  const { wsf_status, province, district, zone } = data;

  return (
    <Fragment>
      <section className="section">
        <header className="section-header">
          <h3 className="title">Church Information</h3>
        </header>
        <form className="form" onSubmit={updateData}>
          <Alert origin={CHURCH_DATA_FAIL} />
          <div className="form-group">
            <label htmlFor="wsf_status">WSF status</label>
            <select
              name="wsf_status"
              onChange={handleChange}
              value={wsf_status}
              id="wsf_status"
              className="form-control"
            >
              <option selected value="">
                --select--
              </option>
              {WSF_STATUS.map((status, idx) => (
                <option value={status} key={idx}>
                  {" "}
                  {`${status}`}{" "}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="new_birth_year">Year of new birth</label>
            <input
              type="date"
              name="new_birth_year"
              onChange={handleChange}
              id="new_birth_year"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="holy_spirit_year">Year of Holy Ghost Baptism</label>
            <input
              type="date"
              name="holy_spirit_year"
              id="holy_spirit_year"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lfc_joined_year">Year joined LFC</label>
            <input
              type="date"
              name="lfc_joined_year"
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ordination_year">Year of Ordination</label>
            <input
              type="date"
              name="ordination_year"
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="province">Province</label>
            <input
              type="text"
              name="province"
              className="form-control"
              value={province}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="district">District</label>
            <input
              type="text"
              name="district"
              className="form-control"
              value={district}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="zone">Zone</label>
            <input
              type="text"
              name="zone"
              className="form-control"
              value={zone}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-sm btn-primary fa fa-check">
            {churchDataRequest ? "processing..." : "Update Church Data"}
          </button>
        </form>
      </section>
    </Fragment>
  );
};

ChurchDataForm.propTypes = {
  updateChurchData: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  currentMember: state.auth.currentMember,
  churchDataRequest: state.profiles.churchDataRequest,
});
export default connect(mapStateToProps, { setAlert, updateChurchData })(
  ChurchDataForm
);
