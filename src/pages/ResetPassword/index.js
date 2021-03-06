import React, { Fragment } from 'react';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ResetPassword = () => {
    return ( 
        <Fragment>
            <Navbar />
            <ResetPasswordForm />
            <Footer />
        </Fragment>
     );
}
 
export default ResetPassword;