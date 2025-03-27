import { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -23.550520,  // São Paulo
  lng: -46.633308
};

function Map() {
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const position = center;
    
    // Criar o marcador avançado quando o mapa carregar
    if (window.google && window.google.maps.marker) {
      const { AdvancedMarkerElement } = window.google.maps.marker;
      new AdvancedMarkerElement({
        map,
        position,
      });
    }
    
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    />
  );
}

export default Map; 