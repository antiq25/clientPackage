import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Skeleton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

const ScrapedReviews = ({ reviews }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedReview, setSelectedReview] = useState(null); // State to store the selected review

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const rows = reviews.map((review, index) => ({
        id: index,

        stars: '⭐'.repeat(review.stars),
        date: review.date === 'a month ago' ? '1 month ago' : review.date,
        review: review.content,
        fullReview: review.content // Store the full review content
    }));

    const columns = [
        { field: 'stars', headerName: 'Rating', flex: 1 },
        { field: 'date', headerName: 'Posted Date', flex: 1 },
        {
            field: 'review', headerName: 'Review', flex: 3, renderCell: (params) => {
                // Limit the display text if it's too long
                return params.value.length > 100 ? params.value.substring(0, 100) + "..." : params.value;
            }
        },
    ];

    const handleClose = () => {
        setSelectedReview(null); // Reset the selected review on close
    };

    return (
        <Card>
            <CardHeader
                subheader="Reviews List"
                title="Customers Reviews"
            />
            {isLoading ? (
                <div style={{ padding: '16px' }}>
                    <Skeleton variant="text" width="40%" height={30} />
                    <Skeleton variant="rectangular" height={460} style={{ marginTop: '16px' }} />
                </div>
            ) : (
                // Added padding to the left of the DataGrid
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10, 25, 50]}
                    pagination
                    disableColumnMenu
                    onRowClick={(params) => setSelectedReview(params.row)}
                    sx={{ paddingLeft: '16px', paddingRight: '16px', height: 500, width: '100%' }}
                />
            )}
            {/* Dialog to display full review content */}
            <Dialog open={Boolean(selectedReview)} onClose={handleClose}>
                <DialogTitle>Full Review</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {selectedReview?.fullReview}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default ScrapedReviews;
