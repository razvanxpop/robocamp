import React, { useState, useEffect } from 'react';
import { verifyEmailApi } from '../services/api/auth-api';

const VerificationPage = () => {
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    const verify = async () => {
      if(token){
        const response = await verifyEmailApi(token);
        setStatus(response);
      }
    }

    verify();
  }, []);

  return(
    <>
      <h1>Verification Page</h1>
      <p>{status}</p>
    </>
  )
};

export default VerificationPage;