import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faTag, faWifi, faStar } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';
import config from '../../../config';

// Function to generate random customer names
const generateRandomName = () => {
  const firstNames = ['John', 'Jane', 'Alex', 'Chris', 'Taylor', 'Morgan', 'Jordan', 'Casey', 'Sydney', 'Pat'];
  const lastNames = ['Doe', 'Smith', 'Johnson', 'Brown', 'Lee', 'Walker', 'Davis', 'Martinez', 'Garcia', 'Lewis'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${lastName}`;
};

const LuggageStoreInfo = ({
  id,
  title,
  details,
  lat,
  lng,
  openTime,
  closeTime,
  GOOGLE_MAPS_API_KEY,
}) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(4.5); // Default to 4.5
  const [reviewCount, setReviewCount] = useState(50); // Default to 50+

  const fallbackReviews = [
    { _id: '1', rating: 5, comment: 'Excellent service! Highly recommend.' },
    { _id: '2', rating: 4, comment: 'Very convenient and reliable.' },
    { _id: '3', rating: 3, comment: 'Friendly staff and great location.' },
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/api/v1/reviews/location/${id}`);
        const data = await response.json();

        if (response.ok) {
          const allReviews = data.data.reviews;

          // Sort reviews by rating descending and take the top 3
          const sortedReviews = allReviews.sort((a, b) => b.rating - a.rating).slice(0, 3);

          setReviews(sortedReviews);

          // Ensure the average rating is always at least 4.5
          const calculatedRating = Math.max(data.data.averageRating, 4.5);
          setAverageRating(calculatedRating);

          // Ensure review count shows as 50+
          setReviewCount(Math.max(data.data.reviewCount, 50));
        } else {
          console.error('Error fetching reviews:', data);
          setReviews(fallbackReviews);
        }
      } catch (error) {
        console.error('Error:', error);
        setReviews(fallbackReviews);
      }
    };

    fetchReviews();
  }, [id]);

  useEffect(() => {
    if (lat && lng) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      window.initMap = function () {
        const location = { lat, lng };
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: location,
          disableDefaultUI: true,
          styles: [
            {
              featureType: 'all',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#7c93a3' }, { lightness: '-10' }],
            },
            {
              featureType: 'administrative.country',
              elementType: 'geometry',
              stylers: [{ visibility: 'simplified' }],
            },
          ],
        });
        new google.maps.Marker({
          position: location,
          map: map,
          title: title,
        });
      };

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [lat, lng, GOOGLE_MAPS_API_KEY, title]);

  const formatTime = (timeStr) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(`1970-01-01T${timeStr}Z`).toLocaleTimeString(undefined, options);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-3xl font-bold mb-6 flex items-center">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#1A73A7] mr-3" />
        {title}
      </h3>
      <h6 className="text-gray-700 mb-6 flex items-center">
        <FontAwesomeIcon icon={faClock} className="text-[#1A73A7] mr-3" />
        {details}
      </h6>
      <div id="map" className="h-80 mb-8 rounded-lg shadow-md"></div>
      <p className="flex items-center mb-4 text-lg">
        <FontAwesomeIcon icon={faTag} className="text-[#1A73A7] mr-3" />
        <strong>Luggage Price:</strong> <span className="ml-2"> starts from $7.90 AUD / Per Day</span>
      </p>
      <p className="mb-4 text-lg">
        <FontAwesomeIcon icon={faStar} className="text-[#eab308] mr-2" />
        <strong>{averageRating.toFixed(1)}</strong> out of 5 stars ({reviewCount}+ reviews)
      </p>
      <p className="mb-4 flex items-center text-lg">
        <FontAwesomeIcon icon={faWifi} className="text-[#1A73A7] mr-3" />
        <strong>Services:</strong> <span className="ml-2">One of the best Luggage Service Providers</span>
      </p>
      <p className="flex items-center mb-6 text-lg">
        <FontAwesomeIcon icon={faClock} className="text-[#1A73A7] mr-3" />
        <strong>Open Time:</strong> <span className="ml-2">{formatTime(openTime)}</span>
        <FontAwesomeIcon icon={faClock} className="ps-4 text-[#1A73A7]" />
        <strong className="ps-2">Close Time:</strong> <span className="ml-2">{formatTime(closeTime)}</span>
      </p>

      <div className="mt-8">
        <h4 className="text-2xl font-semibold mb-4">Customer Reviews</h4>

        <ul className="space-y-6">
          {reviews.map((review) => (
            <li key={review._id} className="p-5 bg-gray-100 rounded-lg shadow-md">
              <div className="flex items-center mb-3">
                <p className="font-semibold text-lg mr-4">
                  {generateRandomName()}:
                </p>
                {[...Array(review.rating)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className="text-yellow-500 mr-1"
                  />
                ))}

                {[...Array(5 - review.rating)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className="text-gray-300 mr-1"
                  />
                ))}
              </div>

              <p className="text-gray-700 text-base mt-2">
                <b className="ms-8">Comment:</b> {review.comment}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Customer's Anonymous Ratings Section */}
      <div className="mt-12">
        <h4 className="text-2xl font-semibold mb-6">Customer's Anonymous Ratings</h4>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
          <div className="flex justify-center items-center mb-4">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-4xl" />
            <span className="text-4xl font-bold ml-3">{averageRating.toFixed(1)}</span>
            <span className="text-lg ml-2 text-gray-500">out of 5 stars</span>
          </div>
          <p className="text-gray-700">Based on {reviewCount}+ anonymous customer ratings.</p>
        </div>
      </div>
    </div>
  );
};

export default LuggageStoreInfo;
