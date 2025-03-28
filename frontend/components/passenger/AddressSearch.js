import { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';

export default function AddressSearch() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleOriginSelect = (place) => {
    if (place.formatted_address) {
      setOrigin(place.formatted_address);
    }
  };

  const handleDestinationSelect = (place) => {
    if (place.formatted_address) {
      setDestination(place.formatted_address);
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow-lg p-4 space-y-4">
        {/* Origem */}
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <Autocomplete
            onLoad={(autocomplete) => {
              autocomplete.addListener('place_changed', () => {
                handleOriginSelect(autocomplete.getPlace());
              });
            }}
          >
            <input
              type="text"
              placeholder="Onde você está?"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full p-2 text-gray-700 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </Autocomplete>
        </div>

        {/* Destino */}
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <Autocomplete
            onLoad={(autocomplete) => {
              autocomplete.addListener('place_changed', () => {
                handleDestinationSelect(autocomplete.getPlace());
              });
            }}
          >
            <input
              type="text"
              placeholder="Para onde vamos?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-2 text-gray-700 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </Autocomplete>
        </div>
      </div>
    </div>
  );
} 