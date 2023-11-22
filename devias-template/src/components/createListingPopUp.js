import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';

const CreateListingDialog = ({
  open,
  onClose,
  onCreationSuccess,
  formData,
  selectedBusiness,
  userId,
}) => {
  const [form, setForm] = useState({
    companyNames: '',
    companyLocations: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open && formData) {
      setForm({
        ...form,
        companyNames: formData.companyNames || '',
        companyLocations: formData.companyLocations || '',
      });
    }
  }, [formData, open]);

  useEffect(() => {
    if (open && selectedBusiness) {
      setForm({
        ...form,
        companyNames: selectedBusiness.companyNames || '',
        companyLocations: selectedBusiness.companyLocations || '',
      });
    }
  }, [selectedBusiness, open]);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const collectReviews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3002/collect-reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyNames: form.companyNames.split(',').map((s) => s.trim()),
          companyLocations: form.companyLocations.split(',').map((s) => s.trim()),
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const reviewsData = await collectReviews();
      if (reviewsData.success) {
        console.log('Reviews collected successfully:', reviewsData.data);
        onCreationSuccess(reviewsData.data);
        onClose();
      } else {
        console.error('Failed to collect reviews:', reviewsData.error);
      }
    } catch (error) {
      console.error('Error in collecting reviews:', error);
    }
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
        <Tooltip title={isLoading ? 'Loading...' : 'Collect Reviews'}>
          <div>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Collect Reviews'}
            </Button>
          </div>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
};

export default CreateListingDialog;
