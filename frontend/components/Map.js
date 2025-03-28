import { GoogleMap, Marker } from '@react-google-maps/api';
import { useState, useCallback } from 'react';

const mapContainerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: -23.5505,  // São Paulo
  lng: -46.6333,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map() {
  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={center}
      options={options}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Marcadores serão adicionados aqui */}
    </GoogleMap>
  );
} 