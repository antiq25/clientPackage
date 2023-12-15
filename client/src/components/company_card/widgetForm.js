import React, { useState } from 'react';
import useUser from 'src/hooks/decode';
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const WidgetForm = ({ selectedBusinessId }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [settings, setSettings] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [embedCodeDialogOpen, setEmbedCodeDialogOpen] = useState(false);
  const [embedCode, setEmbedCode] = useState('');
  const user = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    const widgetData = {
      name,
      code,
      settings,
      viewCount: 0,
      clickCount: 0,
    };

    try {
      const response = await fetch('https://smart.aliveai.net/scrape/create-widget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          userId: user.id,
          businessId: selectedBusinessId,
          widgetData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create widget: ${errorData.message}`);
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Failed to create widget: ${data.message}`);
      }
      setEmbedCode(
        `<script src="https://smart.aliveai.net/js/public-widget.js?id=${data.id}"></script>`
      );

      setEmbedCodeDialogOpen(true);
      setName('');
    } catch (error) {
      setError(error.toString());
    }
    setIsLoading(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    // Provide user feedback that the code has been copied, if desired.
  };

  return (
    <>
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
            <Typography color="error">{error}</Typography>
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
      <Dialog
        open={embedCodeDialogOpen}
        onClose={() => setEmbedCodeDialogOpen(false)}
      >
        <DialogTitle>Embed Your Widget</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="outlined"
            value={embedCode}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <IconButton onClick={handleCopyToClipboard}>
                  <FileCopyIcon />
                </IconButton>
              ),
            }}
          />
          <Button onClick={handleCopyToClipboard}>Copy to Clipboard</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmbedCodeDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WidgetForm;
