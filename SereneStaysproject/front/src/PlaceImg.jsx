import React from 'react';

const PlaceImg = ({ place, index = 0, className = 'object-cover' }) => {
    // Check if place or place.photos exists and is an array
    if (!place || !place.photos || !Array.isArray(place.photos) || place.photos.length === 0) {
        return null; // Return null if there are no valid photos to display
    }

    // Check if the index is out of bounds
    if (index >= place.photos.length || index < 0) {
        index = 0; // Default to the first photo if index is out of bounds
    }

    return (
        <img className={className} src={`http://localhost:4000/uploads/${place.photos[index]}`} alt="" />
    );
};

export default PlaceImg;
