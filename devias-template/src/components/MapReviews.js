import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, Marker, Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { Card, CardHeader, TextField } from '@mui/material';
import ConfirmationDialog from './listingDialog';
import { apiHandler } from '../api/bundle';
import useUser from '../hooks/decode'

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 49.2827,
  lng: -123.1207,
};

const libraries = ['places'];

const BusinessMap = ({ review, rating, business, onBusinessAdded  }) => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [reviewData, setReviewData] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(12);
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [userLocation, setUserLocation] = useState(center); // Default to some center

  // ONCE THE SITE IS USING HTTPS UNCOMMENT THIS
  // useEffect(() => {
  //   // Fetch user's geolocation
  //   var requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow'
  //   };
  //   fetch("https://ipinfo.io/json", requestOptions)
  //     .then(response => response.json())
  //     .then(data => {
  //       const { loc } = data; // "latitude,longitude"
  //       const [latitude, longitude] = loc.split(',').map(Number);
  //       setUserLocation({ lat: latitude, lng: longitude });
  //     })
  //     .catch(error => {
  //       console.error('Error fetching IP info:', error);
  //       setUserLocation(center); // Fall back to default center in case of error
  //     });
  // }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAP_KEY,
    libraries,
  });

  const fetchPlaces = useCallback((map) => {
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: center,
      radius: '5000',
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        setBusinesses(results);
      }
    });
  }, []);

  const onMapLoad = useCallback(
    (mapInstance) => {
      mapRef.current = mapInstance;
      setMap(mapInstance);
      fetchPlaces(mapInstance);
    },
  );


  const onMarkerClick = useCallback((marker) => {
    setCurrentPlaceId(marker.placeId);
    setDialogOpen(true);
    const placeId = marker.placeId;
    if (mapRef.current && placeId) {
      const service = new window.google.maps.places.PlacesService(mapRef.current);
      const request = {
        placeId: placeId,
        fields: ['name', 'rating', 'user_ratings_total', 'reviews'],
      };


      service.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
          setSelectedBusiness(place.name);
          // Assuming 'place.reviews' is an array of review objects
          if (place.reviews) {
            // Calculate the average rating
            const averageRating =
              place.reviews.reduce((acc, { rating }) => acc + rating, 0) / place.reviews.length;
            // Set data for the combined graph
            business(place.name);
            review(place.user_ratings_total);
            rating(averageRating);
            setReviewData([
              {
                category: 'Average Rating',
                averageRating: averageRating,
                totalReviews: place.user_ratings_total,
              },
            ]);
          } else {
            setReviewData([]);
          }
        }
      });
    }
  },
    [business, rating, review]
  );

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();

    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
    
    if (place.place_id) {
      setZoom(17);
      const existingMarker = markers.find(marker => marker.placeId === place.place_id);
      if (existingMarker) {
        onMarkerClick(existingMarker);
      } else {
        console.log('No existing marker found for the selected place');
      }

      mapRef.current.panTo(place.geometry.location);
    } else {
      console.log("Place ID is undefined");
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleAddBusiness = async (placeId) => {
    console.log("Adding business with place ID:", placeId, "Business Name", selectedBusiness);
    try {
      const userId = useUser; // This seems incorrect. You should call useUser() if it's a hook.
      let url = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
      console.log(url)
      const response = await apiHandler.handleCreateListing(
        userId,
        selectedBusiness.slice(0,20),
        url,
        'Imported from the dashboard map.'
      );
      if (response.success) {
        onBusinessAdded();
      } else {
        console.error('Failed to create listing:', response.error);
      }
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader
        title="Businesses Map"
        subheader="Select any business"
      />
      <Autocomplete
        onLoad={(autocomplete) => {
          autocompleteRef.current = autocomplete;
        }}
        onPlaceChanged={onPlaceChanged}
        fields={['place_id', 'geometry', 'name', 'rating', 'user_ratings_total', 'reviews', 'formatted_address']}
      >
        <TextField
          variant="outlined"
          placeholder="Search places..."
          fullWidth
          type='search'
          autoComplete="off"
          sx={{ borderRadius: '0px' }}
        />
      </Autocomplete>
      <GoogleMap
        style={{ paddingLeft: '16px', paddingRight: '16px' }}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onMapLoad}
        onClick={onMarkerClick}
      >
      </GoogleMap>
      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleAddBusiness}
        placeId={currentPlaceId}
      />
    </Card>
  );
};

export default BusinessMap;
