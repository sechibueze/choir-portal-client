import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthContainer from "../../components/AuthContainer";
import { logout } from "../../_actions/authActions";
const Dashboard = ({ currentMember, logout }) => {
    console.log('AuthUser from dashboard', currentMember)
    
    return ( 
        <AuthContainer>
            <div>
                <h1> Hello {currentMember.firstname} </h1>
                {/* <span onClick={() => logout()}> Logout </span> */}
            </div>
        </AuthContainer>
     );
}

Dashboard.propTypes = {
    logout: PropTypes.func.isRequired,
  }
  const mapStateToProps = state => ({
      currentMember: state.auth.currentMember
  })
  export default connect(mapStateToProps, { logout })(Dashboard);
