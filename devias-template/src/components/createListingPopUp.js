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
  const [error, setError] = useState('');
  const [openMap, setOpenMap] = useState(false);

  useEffect(() => {
    if (!open) {
      setForm({ companyNames: '', companyLocations: '' });
      setIsLoading(false);
      setStatus('');
    }
  }, [open]);

  const getMapSrc = (searchQuery) => {
    return `https://www.google.com/maps?q=${encodeURIComponent(searchQuery)}&output=embed`;
  };

  const handleToggleMap = () => {
    setOpenMap(!openMap);
  };

  const collectReviews = async () => {
    setIsLoading(true);
    setStatus('Scraping...');
    try {
      const response = await fetch('https://smart.aliveai.net/scrape/collect-reviews', {
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
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }

      const data = await response.json();

      if (data.message && data.message === 'Python script executed successfully') {
        setStatus('SUCCESS!');
        onCreationSuccess(data);
      } else {
        setStatus('FAIL');
        console.error('Operation failed:', data);
      }
    } catch (error) {
      setStatus('FAIL');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const importReviews = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://smart.aliveai.net/scrape/import-reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to import reviews');
      }
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      setError(err.message || 'Failed to import reviews');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    await collectReviews();
  };

  return (
    <Dialog fullWidth
open={open}
onClose={onClose}>
      <DialogTitle>Create New Listing</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="companyLocations"
          label="Enter Location to Gather Data"
          type="text"
          fullWidth
          variant="standard"
          value={form.companyLocations}
          onChange={handleChange}
          helperText="Include Company Name & Address"
        />
        {openMap && (
          <iframe
            title="google-map"
            src={getMapSrc(form.companyLocations)}
            width="100%"
            height="300px"
            frameBorder="0"
            style={{ border: 'none' }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleToggleMap}>Toggle Map</Button>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          variant="text"
          width="50%"
          startIcon={isLoading && <CircularProgress size={24} />}
        >
          Scrape
        </Button>
        <Button
          onClick={importReviews}
          disabled={isLoading}
          variant="contained"
          startIcon={isLoading && <CircularProgress size={24} />}
        >
          Import Reviews
        </Button>
      </DialogActions>
      {status && <Alert severity={status === 'SUCCESS!' ? 'success' : 'error'}>{status}</Alert>}
    </Dialog>
  );
};

export default CreateListingDialog;
