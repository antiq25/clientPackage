import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { apiHandler } from '../api/bundle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const VerifyEmail = () => {
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailVerified, setEmailVerified] = useState(true); // Assume true by default
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);

  useEffect(() => {
    // Assuming you store your token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      // Assuming your payload has a `emailVerified` field
      setEmailVerified(decoded.emailVerified);
    }
  }, []);

  useEffect(() => {
    if (!emailVerified) {
      setShowVerificationDialog(true);
    }
  }, [emailVerified]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await apiHandler.handleVerifyEmail(code);
      if (response.success) {
        alert('Email verified successfully!');
        setShowVerificationDialog(false);
      } else {
        alert('Verification failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred during verification. Please try again later.');
      console.error('Verification error:', error);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Dialog
        open={showVerificationDialog}
        onClose={() => setShowVerificationDialog(false)}
      >
        <DialogTitle>Your email is not verified</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => setShowVerificationDialog(false)}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Verification Code"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Verifying...' : 'Verify Email'}
        </button>
      </form>
    </>
  );
};

export default VerifyEmail;
