import React, { useState, useEffect } from 'react';
import { MapPin, Search, Star, Clock, Navigation } from 'lucide-react';
import GymMap from './GymMap';

export default function GymFinder() {
  const [searchLocation, setSearchLocation] = useState('');
  const [gyms, setGyms] = useState([]);
  const [position, setPosition] = useState([21.7679, 78.87]); // default SF coords
  const [isSearching, setIsSearching] = useState(false);

  // Fetch gyms from Overpass API
  function fetchGyms(lat, lon) {
    setIsSearching(true);
    const query = `
      [out:json];
      node["leisure"="fitness_centre"](around:1000,${lat},${lon});
      out;`;

    fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.elements) {
          setGyms(data.elements);
        } else {
          setGyms([]);
        }
      })
      .catch(() => setGyms([]))
      .finally(() => setIsSearching(false));
  }

  // Get user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          fetchGyms(latitude, longitude);
        },
        () => {
          // If permission denied, just fetch gyms near default coords
          fetchGyms(position[0], position[1]);
        }
      );
    } else {
      fetchGyms(position[0], position[1]);
    }
  }, []);

  // Handle location search by city or zip code
  const handleSearch = () => {
    if (!searchLocation.trim()) return;
    setIsSearching(true);

    // Use Nominatim to geocode the search location to lat/lon
    fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&limit=10&q=${encodeURIComponent(searchLocation)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
          fetchGyms(parseFloat(lat), parseFloat(lon));
        } else {
          setGyms([]);
          alert('Location not found.');
        }
      })
      .catch(() => alert('Error searching location'))
      .finally(() => setIsSearching(false));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={14}
        color={index < Math.floor(rating) ? '#F59E0B' : '#E5E7EB'}
        fill={index < Math.floor(rating) ? '#F59E0B' : '#E5E7EB'}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow mb-6">
      <div className="flex items-center mb-6">
        <MapPin className="text-blue-600" size={24} />
        <h2 className="text-lg font-semibold text-gray-800 ml-3">Find Nearby Gyms</h2>
      </div>

      <div className="mb-6">
        <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 mb-3">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            placeholder="Enter your location (city, zip code)"
            className="bg-transparent ml-3 w-full text-gray-800 outline-none"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div className='px-20 '>
        <GymMap position={position} gyms={gyms} />
      </div>

      <div className="max-h-[400px] overflow-y-auto mt-6">
        <p className="text-base font-semibold text-gray-800 mb-4">
          Found {gyms.length} gyms near you
        </p>

        {gyms.length === 0 && !isSearching && (
          <p className="text-gray-600 text-base">No gyms found in this area.</p>
        )}

        {gyms.map((gym) => (
          <div key={gym.id} className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{gym.tags.name || 'Unnamed Gym'}</h3>

            <div className="text-sm text-gray-600 mb-2">
              <div><strong>Type:</strong> {gym.tags.leisure || 'Fitness Centre'}</div>
              {gym.tags.address && <div><strong>Address:</strong> {gym.tags.address}</div>}
              {/* Overpass data doesn't always have full address info */}
              <div><strong>Coordinates:</strong> {gym.lat.toFixed(4)}, {gym.lon.toFixed(4)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
