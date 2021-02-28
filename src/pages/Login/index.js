import React, { Fragment } from 'react';
import LoginForm from '../../components/LoginForm';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Login = () => {
    return ( 
        <Fragment>
            <Navbar />
            <LoginForm />
            <Footer />
        </Fragment>
     );
}
 
export default Login;