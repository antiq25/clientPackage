import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const CreateListingDialog = ({ open, onClose, onCreationSuccess }) => {
  const [form, setForm] = useState({
    companyNames: '',
    companyLocations: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!open) {
      setForm({ companyNames: '', companyLocations: '' });
      setIsLoading(false);
      setStatus('');
    }
  }, [open]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const collectReviews = async () => {
    setIsLoading(true);
    setStatus('Scraping...');
    try {
      const response = await fetch('http://localhost:3002/scrape/collect-reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyNames: form.companyNames.split(',').map((s) => s.trim()),
          companyLocations: form.companyLocations.split(',').map((s) => s.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.success) {
        setStatus('SUCCESS!');
        onCreationSuccess(data);
      } else {
        setStatus('FAIL');
      }
    } catch (error) {
      setStatus('FAIL');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    await collectReviews();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Create New Listing</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="companyNames"
          label="Company Names (comma separated)"
          type="text"
          fullWidth
          variant="standard"
          value={form.companyNames}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="companyLocations"
          label="Company Locations (comma separated)"
          type="text"
          fullWidth
          variant="standard"
          value={form.companyLocations}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Collect Reviews'}
        </Button>
      </DialogActions>
      {status && <Alert severity={status === 'SUCCESS!' ? 'success' : 'error'}>{status}</Alert>}
    </Dialog>
  );
};

export default CreateListingDialog;
