import React, { useEffect, useState } from 'react';
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
  useTheme,
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
// - - - - -
import CreateListingDialog from 'src/components/createListingPopUp';
// - - - - 

const ReviewsFetcher = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [isCreateListingDialogOpen, setCreateListingDialogOpen] = useState(false);
  const handleOpenCreateListingDialog = () => setCreateListingDialogOpen(true);
  const handleCloseCreateListingDialog = () => setCreateListingDialogOpen(false);

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Add the eslint-disable-next-line to avoid warning about the empty dependency array

  const fetchReviews = async () => {
    setIsLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3002/scrape/reviews', {
        // Updated the URL to a placeholder as 'localhost:3002' is typically used for local APIs
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include', // Ensure that the backend supports and expects credentials to be sent with requests
      });
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Import reviews functionality not demonstrated in the given code
  // const importReviews = async () => {
  //   ...
  // };

  const handleSelectChange = (event) => {
    setSelectedBusiness(event.target.value);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // handleExpandClick commented out as 'expanded' state and its usage are not demonstrated in the provided code
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  // No mutli-select component demonstrated in the provided code, so no need to transform 'reviews' into 'businessOptions' and 'uniqueBusinessOptions'

  // Map directly to MenuItems and ensure they are unique to avoid duplicate keys
  const uniqueBusinesses = reviews.reduce((unique, review) => {
    const isDuplicate = unique.some((business) => business.name === review.business.name);
    if (!isDuplicate) {
      unique.push(review.business);
    }
    return unique;
  }, []);

  const selectedBusinessDetails = reviews.filter(
    (review) => review.business.name === selectedBusiness
  );

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Paper
        elevation={3}
        sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper' }}
      >
        <Grid
          container
          spacing={3}
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            sm={8}
          >
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
            >
              Reviews Analytics
            </Typography>
            {error && (
              <Alert
                severity="error"
                sx={{ my: 2 }}
              >
                {error}
              </Alert>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
          >
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
            >
              <Button
                onClick={fetchReviews}
                disabled={isLoading}
                variant="contained"
                color="primary"
                startIcon={isLoading ? <CircularProgress size={24} /> : undefined}
              >
                Refresh Reviews
              </Button>
              <Button
                startIcon={<PlusIcon />}
                variant="contained"
                onClick={handleOpenCreateListingDialog}
              >
                Add New Listing
              </Button>
              <CreateListingDialog
                open={isCreateListingDialogOpen}
                onClose={handleCloseCreateListingDialog}
                onCreationSuccess={() => {}}
              />
            </Stack>
          </Grid>
        </Grid>

        <FormControl
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{ mt: 3 }}
        >
          <InputLabel id="business-select-label">Select a Business</InputLabel>
          <Select
            labelId="business-select-label"
            value={selectedBusiness}
            onChange={handleSelectChange}
            label="Select a Business"
          >
            {uniqueBusinesses.map((business) => (
              <MenuItem
                key={business.name}
                value={business.name}
              >
                {business.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Dialog
          fullScreen={fullScreen}
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="responsive-dialog-title" // Add aria-labelledby for accessibility
        >
          <DialogTitle id="responsive-dialog-title">{selectedBusiness}</DialogTitle>
          <DialogContent dividers>
            {selectedBusinessDetails.length > 0 && (
              <Fade
                in={openDialog}
                timeout={500}
              >
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    selectedBusinessDetails[0].business.address
                  )}&output=embed`}
                  width="100%"
                  height="300"
                  frameBorder="0" // Use frameBorder instead of style for the border
                  allowFullScreen
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
            <Button
              autoFocus
              onClick={handleCloseDialog}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default ReviewsFetcher;
