import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { apiHandler } from '../api/bundle';
import useUser from '../hooks/decode';

const CreateListingDialog = ({ open, onClose, onCreationSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    reviews_url: '',
    description: '',
  });

  const handleChange = (event) => {
<<<<<<< HEAD
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    // Call API to create a new listing
    try {
      const userId = useUser; 
      let value = formData.reviews_url;
      if (value.includes("'")) {
        value = value.replace("'", '%E2%80%99'); 
      }
      formData.reviews_url = value;
      const response = await apiHandler.handleCreateListing(
        userId,
        formData.name,
        formData.reviews_url,
        formData.description
      );
      if (response.success) {
        console.log('Listing created successfully:', response.data);
        onCreationSuccess(); // Invoke the callback here
        onClose();
      } else {
        console.error('Failed to create listing:', response.error);
      }
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  const handleSubmit = async () => {
    await collectReviews();
=======
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    // Call API to create a new listing
    try {
      const userId = useUser; 
      let value = formData.reviews_url;
      if (value.includes("'")) {
        value = value.replace("'", '%E2%80%99'); 
      }
      formData.reviews_url = value;
      const response = await apiHandler.handleCreateListing(
        userId,
        formData.name,
        formData.reviews_url,
        formData.description
      );
      if (response.success) {
        console.log('Listing created successfully:', response.data);
        onCreationSuccess(); // Invoke the callback here
        onClose();
      } else {
        console.error('Failed to create listing:', response.error);
      }
    } catch (error) {
      console.error('Error creating listing:', error);
    }
>>>>>>> Mustafa
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
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="reviews_url"
          label="Reviews URL"
          type="url"
          fullWidth
          variant="standard"
          value={formData.reviews_url}
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
          value={formData.description}
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
