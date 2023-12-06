import React, { useState, useEffect } from 'react';
import { useApi } from 'src/components/company_card/apiWidget'; // Import the useApi hook from where it is defined
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Widget from 'src/components/company_card/WidgetDisplay';


const WidgetCard = ({ userId, businessId }) => {
  const [viewCount, setViewCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const api = useApi();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const viewData = await api.getViewCount(userId, businessId);
        const clickData = await api.getClickCount(userId, businessId);
        setViewCount(viewData);
        setClickCount(clickData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, businessId, api]);

  const handleLogClick = async () => {
    try {
      const newClickCount = await api.logClick(userId, businessId);
      setClickCount(newClickCount);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="body2"
color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5"
component="div">
        </Typography>
        <Typography sx={{ mb: 1.5 }}
color="text.secondary">
          Business ID: {businessId}
        </Typography>
        <Typography variant="body2">
          Views: {viewCount}
        </Typography>
        <Typography variant="body2">
          Clicks: {clickCount}
        </Typography>
        <Button variant="contained"
color="primary"
onClick={handleLogClick}>
          Log Click
        </Button>
        <Widget {...userId}/>
      </CardContent>
    </Card>
  );
};

export default WidgetCard;
