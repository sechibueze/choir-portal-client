import React, { Fragment } from 'react';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ForgotPassword = () => {
    return ( 
        <Fragment>
            <Navbar />
            <ForgotPasswordForm />
            <Footer sticky={true} />
        </Fragment>
     );
}
 
export default ForgotPassword;