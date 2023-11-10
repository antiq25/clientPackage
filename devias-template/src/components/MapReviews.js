import React, { useState, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { alpha } from '@mui/system/colorManipulator';
import { styled } from '@mui/material/styles';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useTheme } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 49.2827,
  lng: -123.1207,
};

const libraries = ['places'];

const BusinessMap = ({review, rating, business}) => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [reviewData, setReviewData] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const theme = useTheme();


  const [totalReviewsData, setTotalReviewsData] = useState([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBGx2qihcXLK-_Ek-g-GxlNTDZVlDgf0lU',
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
    [fetchPlaces]
  );

  const onMarkerClick = useCallback((marker) => {
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
            business(place.name)
            review(place.user_ratings_total)
            rating(averageRating)
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
  }, []);

  const onMapClick = useCallback((event) => {
    if (!mapRef.current) {
      console.error('Map reference not available.');
      return;
    }
    const latLng = event.latLng;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          console.log('Nearest address:', results[0].formatted_address);

          const newMarker = {
            place_id: null,
            position: {
              lat: latLng.lat(),
              lng: latLng.lng(),
            },
          };

          setMarkers((prevMarkers) => [...prevMarkers, newMarker]);

          const placesService = new window.google.maps.places.PlacesService(mapRef.current);
          placesService.nearbySearch(
            {
              location: latLng,
              radius: '50',
            },
            (placesResults, placesStatus) => {
              if (
                placesStatus === window.google.maps.places.PlacesServiceStatus.OK &&
                placesResults
              ) {
                console.log('Found places:', placesResults);
              } else {
                console.error('No places found:', placesStatus);
              }
            }
          );
        } else {
          console.log('No results found');
        }
      } else {
        console.error('Geocoder failed due to:', status);
      }
    });
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader 
      title="Map"
      subheader="Select a location to retrieve the rating and reviews number data" />
      <GoogleMap
        style={{paddingLeft: '16px', paddingRight: '16px'}}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onMapLoad}
        onClick={onMarkerClick}
      >
        {markers.map((marker, index) => (
          <Marker
            key={marker.place_id || index}
            position={marker.position}
            placeId={marker.place_id}
            onClick={(e) => {
              e.domEvent?.stopPropagation();
              e.nativeEvent?.stopImmediatePropagation();
              const confirmFetch = window.confirm('Do you want to fetch data from this marker?');
              if (confirmFetch) {
                onMarkerClickHandler(marker);
              }
            }}
          />
        ))}
      </GoogleMap>
    </Card>
  );
};

export default BusinessMap;
