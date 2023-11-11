import React, { useState, useEffect } from 'react';
import { ListItem, Radio, Typography, Card, CardHeader } from '@mui/material';
import { FixedSizeList as VirtualizedList } from 'react-window';

const mockListings = [
    { id: 'L1', name: 'Listing 1' },
    { id: 'L2', name: 'Listing 2' },
    { id: 'L3', name: 'Listing 3' },
    // ... add more listings as needed
];

const ListingSelector = ({ onSelect }) => {
    const [selectedListing, setSelectedListing] = useState(null);

    useEffect(() => {
        if (mockListings.length > 0) {
            setSelectedListing(mockListings[0].id);
            onSelect(mockListings[0]);
        }
    }, [onSelect]);

    const handleSelect = (listing) => {
        setSelectedListing(listing.id);
        onSelect(listing);
    };

    const Row = ({ index, style }) => (
        <ListItem style={style} key={mockListings[index].id} button onClick={() => handleSelect(mockListings[index])}>
            <Radio
                checked={selectedListing === mockListings[index].id}
            />
            <Typography>{mockListings[index].name}</Typography>
        </ListItem>
    );

    return (
        <Card>
            <CardHeader
                title="Businesses Map"
                subheader="Select Listing Section" />
            {mockListings.length > 0 ? (
                <VirtualizedList
                    height={300}
                    width="100%"
                    itemCount={mockListings.length}
                    itemSize={50}
                >
                    {Row}
                </VirtualizedList>
            ) : (
                <Typography variant="body1" color="textSecondary">No listings available.</Typography>
            )}
        </Card>
    );
}

export default ListingSelector;
