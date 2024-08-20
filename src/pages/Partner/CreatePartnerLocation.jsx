import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';

const locationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  street: Yup.string().required('Required'),
  district: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zipCode: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  capacity: Yup.number().required('Required').positive().integer(),
  availableSpace: Yup.number().required('Required').positive().integer(),
  regularPrice: Yup.number().required('Required').positive(),
  discountPercentage: Yup.number().required('Required').min(0).max(100),
  availableFrom: Yup.date().required('Required'),
  availableTo: Yup.date().required('Required'),
  amenities: Yup.string().required('Required'),
  notes: Yup.string().required('Required'),
  pictures: Yup.string().required('Required')
});

const MapSelector = ({ onSelect }) => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const locationInputRef = useRef(null);

  const onLoad = useCallback((autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  }, []);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const position = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setSelectedPosition(position);
        onSelect(position);
      } else {
        console.log('No geometry available for the selected place');
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const handleMapClick = (event) => {
    const { lat, lng } = event.latLng;
    const position = { lat: lat(), lng: lng() };
    setSelectedPosition(position);
    onSelect(position);
  };

  return (
    <LoadScript googleMapsApiKey={config.GOOGLE_API_KEY} libraries={['places']}>
      <div className="relative">
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
            </span>
            <input
              type="text"
              id="location"
              className="form-input p-2 pl-10 pr-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
              placeholder="Search location..."
              ref={locationInputRef}
            />
          </div>
        </Autocomplete>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={selectedPosition || { lat: -33.856779, lng: 151.215256 }}
          zoom={15}
          onClick={handleMapClick}
        >
          {selectedPosition && <Marker position={selectedPosition} />}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

const LocationForm = ({ onSubmit, location }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        street: location?.street || '',
        district: location?.district || '',
        city: location?.city || '',
        state: location?.state || '',
        zipCode: location?.zipCode || '',
        country: location?.country || '',
        capacity: '',
        availableSpace: '',
        regularPrice: '',
        discountPercentage: '',
        availableFrom: '',
        availableTo: '',
        amenities: '',
        notes: '',
        pictures: ''
      }}
      validationSchema={locationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className="overflow-y-auto" style={{ maxHeight: '80vh' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Location Details</Typography>
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="name"
                label="Name"
                fullWidth
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="description"
                label="Description"
                fullWidth
                error={touched.description && !!errors.description}
                helperText={touched.description && errors.description}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="street"
                label="Street"
                fullWidth
                error={touched.street && !!errors.street}
                helperText={touched.street && errors.street}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="district"
                label="District"
                fullWidth
                error={touched.district && !!errors.district}
                helperText={touched.district && errors.district}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="city"
                label="City"
                fullWidth
                error={touched.city && !!errors.city}
                helperText={touched.city && errors.city}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="state"
                label="State"
                fullWidth
                error={touched.state && !!errors.state}
                helperText={touched.state && errors.state}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="zipCode"
                label="Zip Code"
                fullWidth
                error={touched.zipCode && !!errors.zipCode}
                helperText={touched.zipCode && errors.zipCode}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="country"
                label="Country"
                fullWidth
                error={touched.country && !!errors.country}
                helperText={touched.country && errors.country}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="capacity"
                label="Capacity"
                fullWidth
                error={touched.capacity && !!errors.capacity}
                helperText={touched.capacity && errors.capacity}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="availableSpace"
                label="Available Space"
                fullWidth
                error={touched.availableSpace && !!errors.availableSpace}
                helperText={touched.availableSpace && errors.availableSpace}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="regularPrice"
                label="Regular Price"
                fullWidth
                error={touched.regularPrice && !!errors.regularPrice}
                helperText={touched.regularPrice && errors.regularPrice}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="discountPercentage"
                label="Discount Percentage"
                fullWidth
                error={touched.discountPercentage && !!errors.discountPercentage}
                helperText={touched.discountPercentage && errors.discountPercentage}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="availableFrom"
                label="Available From"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={touched.availableFrom && !!errors.availableFrom}
                helperText={touched.availableFrom && errors.availableFrom}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="availableTo"
                label="Available To"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={touched.availableTo && !!errors.availableTo}
                helperText={touched.availableTo && errors.availableTo}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="amenities"
                label="Amenities (comma separated)"
                fullWidth
                error={touched.amenities && !!errors.amenities}
                helperText={touched.amenities && errors.amenities}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="notes"
                label="Notes"
                fullWidth
                error={touched.notes && !!errors.notes}
                helperText={touched.notes && errors.notes}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="pictures"
                label="Pictures (URLs, comma separated)"
                fullWidth
                error={touched.pictures && !!errors.pictures}
                helperText={touched.pictures && errors.pictures}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

const CreateLocation = () => {
  const [location, setLocation] = useState({});

  const handleSelect = (position) => {
    setLocation((prev) => ({ ...prev, coordinates: position }));
  };

  const handleSubmit = async (values) => {
    const locationData = { ...values, coordinates: location.coordinates };
    console.log(locationData);

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(`${config.API_BASE_URL}api/v1/locations/locations`, locationData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        alert('Location created successfully!');
      } else {
        alert('Failed to create location.');
      }
    } catch (error) {
      console.error('Error creating location:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: 16 }}>
          <MapSelector onSelect={handleSelect} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: 16 }}>
          <LocationForm onSubmit={handleSubmit} location={location} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateLocation;
