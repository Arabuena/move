import { useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

export function GoogleMapsWrapper({ children }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) {
    return <div>Erro ao carregar o mapa</div>;
  }

  if (!isLoaded) {
    return <div>Carregando...</div>;
  }

  return children;
} 