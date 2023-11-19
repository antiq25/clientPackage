'use client';
// BusinessMap.js
import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import {
  Card,
  CardHeader,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import CreateListingDialog from './createListingPopUp'; // Adjust the import path as needed

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 49.2827,
  lng: -123.1207,
};

const libraries = ['places'];

const BusinessMap = () => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [createListingDialogOpen, setCreateListingDialogOpen] = useState(false);
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBGx2qihcXLK-_Ek-g-GxlNTDZVlDgf0lU',
    libraries,
  });

  const fetchPlaces = useCallback((map) => {
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: center,
      radius: '500',
    };
  }, []);

  const onMapLoad = useCallback(
    (mapInstance) => {
      mapRef.current = mapInstance;
      fetchPlaces(mapInstance);
    },
    [fetchPlaces]
  );

const onMarkerClick = useCallback((marker) => {
  const placeId = marker.placeId;
  if (mapRef.current && placeId) {
    const service = new window.google.maps.places.PlacesService(mapRef.current);
    const request = {
      placeId: placeId,
      fields: ['name', 'geometry'],
    };

    service.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
        const businessName = encodeURIComponent(place.name);
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const reviewsUrl = `https://www.google.com/maps/place/${businessName}/@${lat},${lng},651m/data=!3m1!1e3!4m16!1m9!3m8!1s${placeId}?hl=en&entry=ttu#:~:text=Overview-,Reviews,-About`;

        setSelectedBusiness({ reviewsUrl });
        setCreateListingDialogOpen(true);
      }
    });
  }
}, []);


  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card>
        <CardHeader
          title="Businesses Map"
          subheader="Select any business"
        />
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onLoad={onMapLoad}
          onClick={(e) => onMarkerClick(e)}
        >
          {businesses.map((business, index) => (
            <Marker
              key={business.place_id || index}
              position={business.position}
              onClick={() => onMarkerClick(business)}
            />
          ))}
        </GoogleMap>
      </Card>

      {selectedBusiness && (
        <CreateListingDialog
          open={createListingDialogOpen}
          onClose={() => setCreateListingDialogOpen(false)}
          formData={selectedBusiness}
          onCreationSuccess={() => setCreateListingDialogOpen(false)}
        />
      )}
    </>
  );
};

export default BusinessMap;
