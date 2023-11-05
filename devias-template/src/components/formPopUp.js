import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const FormPopup = ({ open, handleClose, fields, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Fill the form</DialogTitle>
      <DialogContent>
        {fields.map((field) =>
          field.type === 'select' ? (
            <FormControl
              variant="outlined"
              fullWidth
              margin="normal"
              key={field.name}
            >
              <InputLabel>{field.label}</InputLabel>
              <Select
                label={field.label}
                onChange={(e) => handleChange(e, field.name)}
              >
                {field.options.map((option) => (
                  <MenuItem
                    value={option}
                    key={option}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <TextField
              key={field.name}
              label={field.label}
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => handleChange(e, field.name)}
            />
          )
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="outlined"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormPopup;
