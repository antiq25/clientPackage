/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';
import useUser from '../hooks/decode'; // Adjust the import path as needed
import { apiHandler } from '../api/bundle'; // Adjust the import path as needed

const EmailVerificationDialog = () => {
  const user = useUser();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    // Trigger the dialog if the user's email is not verified
    if (user && !user.emailVerified) {
      setOpen(true);
    }
  }, [user]);

  const handleVerifyNow = () => {
    // Close the dialog and redirect to the verification page
    setOpen(false);
    router.push('/verify');
  };

  const handleResendCode = async () => {
    // Call the API to resend the verification code
    try {
      const response = await apiHandler.handleResendEmailVerification(user.email);
      if (response.success) {
        alert('A new verification code has been sent to your email.');
      } else {
        alert('Failed to resend verification code. Please try again later.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
      console.error('Resend verification code error:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // If there is no user or the email is verified, don't render the dialog
  if (!user || user.emailVerified) {
    return null;
  }

  // Render the dialog with actions
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Email Verification Needed</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Before proceeding, please check your email for a verification code. If you haven't
          received it, you can request a new one.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Later</Button>
        <Button
          onClick={handleVerifyNow}
          color="primary"
        >
          Verify Now
        </Button>
        <Link
          component="button"
          variant="body2"
          onClick={handleResendCode}
        >
          Didn't get a code?
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export default EmailVerificationDialog;
