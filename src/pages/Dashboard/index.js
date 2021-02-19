import React from 'react';

const Dashboard = ({ authUser}) => {
    console.log('AuthUser from dashboard',authUser)
    return ( 
        <h1> dashboard {authUser.me.firstname } </h1>
     );
}
 
export default Dashboard;