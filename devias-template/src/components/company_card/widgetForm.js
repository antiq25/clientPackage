import React, { useState } from 'react';
import useUser from 'src/hooks/decode';
import { TextField, Button, Box, CircularProgress } from '@mui/material';

const WidgetForm = ({ selectedBusinessId }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [settings, setSettings] = useState(''); // Assuming settings is a string for simplicity
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Assuming useUser hook returns an object with user details including the ID
  const user = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    // Construct the widgetData object with the required properties
    const widgetData = {
      name,
      code,
      settings, // Assuming settings is a string
      viewCount: 0, // Initialize viewCount as a string "0"
      clickCount: 0, // Initialize clickCount as a string "0"
    };

    try {
      const response = await fetch('http://localhost:3002/scrape/create-widget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          userId: user.id, // Use the user ID from the useUser hook
          businessId: selectedBusinessId,
          widgetData, // Include the widgetData object
        }),
      });

      if (response.ok) {
        console.log('Widget created successfully!');
        setName('');
        setCode('');
        setSettings('');
      } else {
        const errorData = await response.json();
        throw new Error(`Failed to create widget: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 1 }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Widget Name"
        name="name"
        autoComplete="name"
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="code"
        label="Widget Code"
        name="code"
        autoComplete="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="settings"
        label="Widget Settings"
        name="settings"
        autoComplete="settings"
        value={settings}
        onChange={(e) => setSettings(e.target.value)}
      />
      {error && (
        <Box sx={{ mt: 2 }}>
          <p style={{ color: 'red' }}>{error}</p>
        </Box>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Create Widget'}
      </Button>
    </Box>
  );
};

export default WidgetForm;
