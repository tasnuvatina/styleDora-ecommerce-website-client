import React from 'react';
import {Link} from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="text-center container">
            <h1 className="text-center text-danger mt-5">404 Page Not Found</h1>
            <p className="text-center mt-2">The page you have been liiking is currently not available</p>
            <Link to="/"><button className="buyButton mt-4" >Go To Home Page</button></Link>
        </div>
    );
};

export default ErrorPage;