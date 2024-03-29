import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { apiHandler } from '../api/bundle'; // Adjust the import path as needed
import useUser from '../hooks/decode'; // Adjust the import path as needed

const CreateListingDialog = ({ open, onClose, onCreationSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    reviews_url: '',
    description: '',
  });

  const handleChange = (event) => {
    console.log(event);
    console.log(formData);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    // Call API to create a new listing
    try {
      const userId = useUser; // This seems incorrect. You should call useUser() if it's a hook.
      let value = formData.reviews_url;
      if (value.includes("'")) {
        console.log('found');
        value = value.replace("'", '%E2%80%99'); // Replace single quote with two single quotes
      }
      formData.reviews_url = value;
      console.log(formData.reviews_url);
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
