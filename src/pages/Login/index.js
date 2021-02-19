import React, { Fragment } from 'react';
import LoginForm from '../../components/LoginForm';
import Navbar from '../../components/Navbar';

const Login = () => {
    return ( 
        <Fragment>
            <Navbar />
            <LoginForm />
        </Fragment>
     );
}
 
export default Login;