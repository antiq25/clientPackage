

import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormPopUp from './formPopUp';
import useUser from '../hooks/decode';  
import { dashboardAPI  } from '../api/bundle';  

const BusinessListing = () => {
  const [dataRows, setDataRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const user = useUser();
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
  ];

const initialRows = [
    { id: '', name: '', description: '' },
];

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      dashboardAPI.getListing(user.id)
      .then((response) => {
          if (response.success) {
            console.log('Listings:', response);
            // Transform the listings to the format expected by DataGrid
            const transformedListings = response.data.listing.map((listing, index) => ({
              id: listing.id, // Assuming each listing has an 'id' field
              name: listing.name, // Assuming each listing has a 'name' field
              description: listing.description, // Assuming each listing has a 'description' field
            }));
            setDataRows(transformedListings);
          } else {
            // Handle the case where fetching listings is not successful
            console.error('Failed to fetch listings:', response.error);
          }
        })
        .catch((error) => {
          console.error('Error fetching listings:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
      }
    }, [user]);
   

  const handleSelectionChange = (params) => {
    setSelectedRows(params);
  };

  const handleAdd = (newData) => {
    const newBusiness = { id: dataRows.length + 1, ...newData };
    setDataRows((prevRows) => [...prevRows, newBusiness]);
  };

  const handleRemove = () => {
    setDataRows((prevRows) => prevRows.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const businessFields = [
    { name: 'id', label: 'ID' },
    { name: 'name', label: 'Name' },
    { name: 'description', label: 'Description' },
  ];

  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Button variant="outlined"
onClick={handleOpenPopup}>
          Add
        </Button>
        <FormPopUp
          open={isPopupOpen}
          handleClose={handleClosePopup}
          fields={businessFields}
          onSubmit={handleAdd}
        />
        <Button variant="outlined"
onClick={handleRemove}
disabled={selectedRows.length === 0}>
          Remove
        </Button>
      </Box>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          Loading...
        </div>
      ) : (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={dataRows}
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default BusinessListing;
