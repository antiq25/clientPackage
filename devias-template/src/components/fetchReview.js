
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useEffect, useState } from 'react';

const ReviewsFetcher = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3002/scrape/reviews', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      setError(err.message || 'Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  };

  const importReviews = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3002/scrape/import-reviews', {
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

  const handleSelectChange = (event) => {
    const businessName = event.target.value;
    setSelectedBusiness(businessName);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setExpanded(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // Check if reviews is an array before mapping
  // Ensure businessOptions is an array before calling map
  const businessOptions = Array.isArray(reviews)
    ? reviews.map((review) => review.business.name)
    : [];
  const uniqueBusinessOptions = [...new Set(businessOptions)];

  // Ensure selectedBusinessDetails is an array before calling filter
  const selectedBusinessDetails =
    Array.isArray(reviews) && selectedBusiness
      ? reviews.filter((review) => review.business.name === selectedBusiness)
      : [];

 return (
  <Box sx={{ flexGrow: 1, p: 2 }}>
    <Paper elevation={3}
sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
      <Grid container
spacing={3}
alignItems="center">
        <Grid item
xs={12}
sm={8}>
          <Typography variant="h4"
component="h1"
gutterBottom>
            Reviews Analytics
          </Typography>
          <Box sx={{ my: 2 }}>
          </Box>
        </Grid>
        <Grid item
xs={12}
sm={4}>
          <Stack direction="row"
spacing={2}
justifyContent="flex-end">
            <Button
              onClick={importReviews}
              disabled={isLoading}
              variant="contained"
              color="primary"
              startIcon={isLoading && <CircularProgress size={24} />}
            >
              Import Reviews
            </Button>
            <Button
              onClick={fetchReviews}
              disabled={isLoading}
              variant="contained"
              color="primary"
              startIcon={isLoading && <CircularProgress size={24} />}
            >
              Refresh Reviews
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {error && (
        <Alert severity="error"
sx={{ my: 2 }}>
          {error}
        </Alert>
      )}
      <FormControl fullWidth
margin="normal"
variant="outlined"
sx={{ mt: 3 }}>
        <InputLabel id="business-select-label">Select a Business</InputLabel>
        <Select
          labelId="business-select-label"
          value={selectedBusiness}
          onChange={handleSelectChange}
          label="Select a Business"
        >
          {uniqueBusinessOptions.map((businessName) => (
            <MenuItem key={businessName}
value={businessName}>
              {businessName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedBusiness}</DialogTitle>
        <DialogContent dividers>
          {selectedBusinessDetails.length > 0 && (
            <Fade in={openDialog}
timeout={500}>
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(selectedBusinessDetails[0].business.address)}&output=embed`}
                width="100%"
                height="300px"
                frameBorder="0"
                style={{ border: 'none' }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </Fade>
          )}
          <List>
            {selectedBusinessDetails.map((detail, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>
                    <StarBorderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`Rating: ${detail.rating}`}
                  secondary={`${detail.reviewerName} - ${detail.reviewText}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  </Box>
);
            }

export default ReviewsFetcher;
