import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Bar, Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";
import AuthContainer from "../../components/AuthContainer";
import ShowAccessData from "../../components/ShowAccessData";
import AddPostForm from "../../components/AddPostForm";
import DataCard from "../../components/DataCard";
import { logout } from "../../_actions/authActions";
import { getMembers } from "../../_actions/memberActions";

import "./Dashboard.scss";
import PostFeed from "../../components/PostFeed";
const Dashboard = ({
  currentMember,
  members,
  getMembers,
  membersRequest,
  logout,
}) => {
  console.log("AuthUser from dashboard", currentMember);
  const dataset = {
    labels: ["active", "inactive", "suspended"],
    datasets: [
      {
        label: "Memebers activity",
        backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
        hoverBackgroundColor: ["#501800", "#4B5000", "gray"],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: [65, 59, 80],
      },
    ],
  };

  useEffect(getMembers, [getMembers]);
  return (
    <AuthContainer>
      <div className="container">
        {currentMember && !currentMember.auth.includes("admin") && (
          <ShowAccessData member={currentMember} />
        )}
        {currentMember.auth.includes("admin") && (
          <Fragment>
            <div className="preview-stats">
              {membersRequest && members.length < 1 ? (
                <span>loading</span>
              ) : (
                <span>loaded {members.length}</span>
              )}
              <DataCard title={34} message={"members"} />
              <div className="chart-wrapper">
                <Bar
                  data={dataset}
                  width={350}
                  // height={"100%"}
                  height={350}
                  options={{
                    title: {
                      display: true,
                      text: "FTC members activity",
                      fontSize: 12,
                    },
                    legend: {
                      display: true,
                      position: "top",
                    },
                  }}
                />
              </div>
              <div className="chart-wrapper">
                <Doughnut
                  data={dataset}
                  width={350}
                  height={350}
                  options={{
                    title: {
                      display: true,
                      text: "FTC members activity",
                      fontSize: 12,
                    },
                    legend: {
                      display: true,
                      position: "top",
                    },
                  }}
                />
              </div>
            </div>
            <PostFeed />
            <div className="post">
              <AddPostForm />
            </div>
          </Fragment>
        )}
      </div>
    </AuthContainer>
  );
};

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  getMembers: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  members: state.members.members,
  currentMember: state.auth.currentMember,
  membersRequest: state.members.membersRequest,
});
export default connect(mapStateToProps, { logout, getMembers })(Dashboard);
