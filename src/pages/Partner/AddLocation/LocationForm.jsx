import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const locationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    street: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    zipCode: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    capacity: Yup.number().required('Required').typeError('Must be a number'),
    openTime: Yup.string().required('Required'),
    closeTime: Yup.string().required('Required'),
});

const LocationForm = ({ onSubmit, location, loading }) => {
    const [previewPictures, setPreviewPictures] = useState([]);

    return (
        <Formik
            initialValues={{
                name: location?.additionalDetails?.name || '',
                description: location?.additionalDetails?.description || '',
                street: location?.addressDetails?.street || '',
                city: location?.addressDetails?.city || '',
                state: location?.addressDetails?.state || '',
                zipCode: location?.addressDetails?.zipCode || '',
                country: location?.addressDetails?.country || '',
                capacity: location?.additionalDetails?.capacity || '',
                openTime: location?.additionalDetails?.openTime || '',
                closeTime: location?.additionalDetails?.closeTime || '',
                closedDays: 'Sunday', // Default value, hidden
                locationType: 'Other', // Default value, hidden
                timezone: location?.timezone || '',
                files: [],
            }}
            validationSchema={locationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ errors, touched, setFieldValue, isValid, isSubmitting }) => {
                useEffect(() => {
                    if (location?.addressDetails) {
                        setFieldValue('street', location.addressDetails.street);
                        setFieldValue('city', location.addressDetails.city);
                        setFieldValue('state', location.addressDetails.state);
                        setFieldValue('zipCode', location.addressDetails.zipCode);
                        setFieldValue('country', location.addressDetails.country);
                    }
                    if (location?.additionalDetails) {
                        setFieldValue('name', location.additionalDetails.name);
                        setFieldValue('description', location.additionalDetails.description);
                        setFieldValue('capacity', location.additionalDetails.capacity);
                        setFieldValue('openTime', location.additionalDetails.openTime);
                        setFieldValue('closeTime', location.additionalDetails.closeTime);
                        setFieldValue('closedDays', 'Sunday'); // Default value, hidden
                        setFieldValue('locationType', 'Other'); // Default value, hidden
                        setFieldValue('timezone', location.timezone);
                    }
                }, [location, setFieldValue]);

                const handleFileChange = (event) => {
                    const files = event.currentTarget.files;
                    setFieldValue('files', files);

                    const filePreviews = Array.from(files).map(file => URL.createObjectURL(file));
                    setPreviewPictures(filePreviews);
                };

                return (
                    <Form className="overflow-y-auto" style={{ maxHeight: '80vh' }}>
                        <div className="space-y-4">
                            <h6 className="text-xl font-semibold">Location Details</h6>
                            {[
                                { name: 'name', label: 'Name' },
                                { name: 'description', label: 'Description' },
                                { name: 'street', label: 'Street' },
                                { name: 'city', label: 'City' },
                                { name: 'state', label: 'State' },
                                { name: 'zipCode', label: 'Post Code' },
                                { name: 'country', label: 'Country' },
                                { name: 'capacity', label: 'Capacity' },
                                { name: 'openTime', label: 'Open Time', type: 'time' },
                                { name: 'closeTime', label: 'Close Time', type: 'time' },
                            ].map(({ name, label, type = 'text' }) => (
                                <div key={name} className="form-group">
                                    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                                        {label}
                                    </label>
                                    <Field
                                        as="input"
                                        name={name}
                                        type={type}
                                        placeholder={label}
                                        className={`form-input mt-1 block w-full rounded-md ${
                                            errors[name] && touched[name]
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        }`}
                                    />
                                    {errors[name] && touched[name] && (
                                        <div className="text-red-500 text-sm">{errors[name]}</div>
                                    )}
                                </div>
                            ))}
                            <div className="form-group">
                                <label htmlFor="files" className="block text-sm font-medium text-gray-700">
                                    Pictures
                                </label>
                                <input
                                    id="files"
                                    name="files"
                                    type="file"
                                    multiple
                                    className={`form-input mt-1 block w-full rounded-md ${
                                        errors.files && touched.files
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    }`}
                                    onChange={handleFileChange}
                                />
                                {errors.files && touched.files && (
                                    <div className="text-red-500 text-sm">{errors.files}</div>
                                )}
                                <div className="mt-2 flex flex-wrap">
                                    {previewPictures.map((src, index) => (
                                        <img
                                            key={index}
                                            src={src}
                                            alt={`Preview ${index}`}
                                            className="h-20 w-20 object-cover mr-2 mb-2 rounded"
                                        />
                                    ))}
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
                                    isSubmitting || !isValid ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                disabled={isSubmitting || !isValid}
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
                                        </svg>
                                        Loading...
                                    </div>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default LocationForm;
