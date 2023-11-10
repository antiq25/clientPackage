import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, Card, CardHeader } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import FormPopUp from './formPopUp';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import MinusIcon from '@untitled-ui/icons-react/build/esm/minus';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'description', headerName: 'Description', width: 300 },
];

const initialRows = [
  { id: 1, name: 'Business 1', description: 'Description 1' },
  { id: 2, name: 'Business 2', description: 'Description 2' },
];

const BusinessListing = () => {
  const [dataRows, setDataRows] = useState([]);  // Change from rows to dataRows for consistency
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDataRows(initialRows);  // Set initial data rows after loading
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSelectionChange = (params) => {
    // Extracting row data for the selected rows
    // const selectedData = params.map(index => dataRows[index - 1]);
    setSelectedRows(params);
  };

  const handleAdd = (newData) => {
    const newBusiness = {
      ...newData
    };
    setDataRows(prevRows => [...prevRows, newBusiness]);
  };

  const handleRemove = () => {
    setDataRows(prevRows => prevRows.filter(row => !selectedRows.includes(row.id)));
    setSelectedRows([]); // Clear the selection after deleting
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
    <Card>
      <CardHeader
        subheader="Businesses"
        title="Business List"
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, paddingLeft: '16px', paddingRight: '16px' }}>
        <Button
          startIcon={
            <SvgIcon>
              <PlusIcon />
            </SvgIcon>
          }
          variant="contained" onClick={handleOpenPopup}>
          Add
        </Button>
        <FormPopUp
          open={isPopupOpen}
          handleClose={handleClosePopup}
          fields={businessFields}
          onSubmit={handleAdd}
        />
        <Button
          startIcon={
            <SvgIcon>
              <MinusIcon />
            </SvgIcon>
          }
          variant="contained" onClick={handleRemove} disabled={selectedRows.length === 0}>
          Remove
        </Button>
      </Box>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          Loading...
        </div>
      ) : (
        <DataGrid
          rows={dataRows}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={handleSelectionChange}
          sx={{ paddingLeft: '16px', paddingRight: '16px', height: 500, width: '100%', border: 0 }}
        />
      )}
    </Card>
  );
};

export default BusinessListing;