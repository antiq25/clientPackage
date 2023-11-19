import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { apiHandler } from '../api/bundle';
import useUser from '../hooks/decode';

const CreateListingDialog = ({
  open,
  onClose,
  onCreationSuccess,
  formData,
  userId,
  selectedBusiness,
}) => {
  const [form, setForm] = useState({
    name: '',
    reviews_url: '',
    description: '',
  });

  useEffect(() => {
    if (open && formData) {
      setForm({
        name: formData.name || '',
        reviews_url: formData.reviewsUrl || '',
        description: `Average Rating: ${formData.averageRating || 'N/A'}, Total Reviews: ${
          formData.totalReviews || 0
        }`,
      });
    }
  }, [formData, open]);

  useEffect(() => {
    if (open && selectedBusiness) {
      setForm({
        name: selectedBusiness.name || '',
        reviews_url: selectedBusiness.reviewsUrl || '',
        description: '',
      });
    }
  }, [open, selectedBusiness]);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await apiHandler.handleCreateListing(
        userId,
        form.name,
        form.reviews_url,
        form.description
      );
      if (response.success) {
        console.log('Listing created successfully:', response.data);
        onCreationSuccess();
        onClose();
      } else {
        console.error('Failed to create listing:', response.error);
      }
    } catch (error) {
      console.error('Error creating listing:', error);
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
          name="name"
          label="Listing Name"
          type="text"
          fullWidth
          variant="standard"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="reviews_url"
          label="Reviews URL"
          type="text"
          fullWidth
          variant="standard"
          value={form.reviews_url}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          multiline
          variant="standard"
          value={form.description}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateListingDialog;
