import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, Card, CardHeader } from '@mui/material';
import FormPopUp from './formPopUp';

const columns = [
  { field: 'pixelCode', headerName: 'Pixel Code', width: 200 },
  { field: 'pixelStatus', headerName: 'Pixel Status', width: 150 },
  { field: 'listingName', headerName: 'Listing Name', width: 250 },
];

const initialRows = [
  { id: 1, pixelCode: 'PX001', pixelStatus: 'Active', listingName: 'Listing 1' },
  { id: 2, pixelCode: 'PX002', pixelStatus: 'Inactive', listingName: 'Listing 2' },
];

const PixelTracking = (formData) => {
  const [dataRows, setDataRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDataRows(initialRows);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSelectionChange = (params) => {
    // console.log('Selected Row Indices:', params);

    // Extracting row data for the selected rows
    // const selectedData = params.map(index => dataRows[index - 1]);
    // console.log('Selected Row Data:', selectedData);

    setSelectedRows(params);
  };

  const handleAddPixel = (newData) => {
    let randomMockNum = Math.floor(Math.random() * 100);
    const newPixel = {
      id: dataRows.length + randomMockNum,
      ...newData,
    };
    setDataRows((prevRows) => [...prevRows, newPixel]);
  };

  const handleDeletePixel = () => {
    setDataRows((prevRows) => prevRows.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]); // Clear the selection after deleting
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const pixelFields = [
    { name: 'pixelCode', label: 'Pixel Code', type: 'text' },
    { name: 'pixelStatus', label: 'Pixel Status', type: 'select', options: ['Active', 'Inactive'] },
    { name: 'listingName', label: 'Listing Na me', type: 'text' },
  ];

  return (
    <>
      {isLoading ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}
        >
          Loading...
        </div>
      ) : (
        <Card>
          <CardHeader
            subheader="Pixel Tracking Table"
            title="Pixel Tracking"
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 2,
              paddingLeft: '16px',
              paddingRight: '16px',
            }}
          >
            <Button
              variant="outlined"
              onClick={handleOpenPopup}
            >
              Add Pixel
            </Button>
            <FormPopUp
              open={isPopupOpen}
              handleClose={handleClosePopup}
              fields={pixelFields}
              onSubmit={handleAddPixel}
            />
            <Button
              variant="outlined"
              onClick={handleDeletePixel}
            >
              Delete Pixel
            </Button>
          </Box>
          <DataGrid
            rows={dataRows}
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionChange}
            sx={{
              paddingLeft: '16px',
              paddingRight: '16px',
              height: 500,
              width: '100%',
              border: 0,
            }}
          />
        </Card>
      )}
    </>
  );
};

export default PixelTracking;
