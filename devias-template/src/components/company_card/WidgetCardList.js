import { useState, useEffect } from 'react';
import axios from 'axios';
import useUser  from 'src/hooks/decode';
import { CompanyCard } from 'src/sections/dashboard/jobs/company-card';
import Grid from '@mui/material/Grid';

const WidgetsList = () => {
  const [widgetsData, setWidgetsData] = useState([]);
  const userId = useUser();

  const fetchUserWidgets = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/scrape/user-widgets`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setWidgetsData(response.data);
    } catch (error) {
      console.error('Error fetching widgets', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserWidgets();
    }
  }, [userId]);

  return (
    <Grid container spacing={3}>
      {widgetsData.map((widget) => (
        <Grid item key={widget.id} xs={12} sm={6} md={4}>
          <CompanyCard
            company={{
              name: widget.business.name,
              shortDescription: widget.widgetDescription,
              logo: widget.widgetLogo,
              employees: widget.widgetEmployees,
              averageRating: widget.widgetRating,
              isVerified: true,
              jobs: [],
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default WidgetsList;
