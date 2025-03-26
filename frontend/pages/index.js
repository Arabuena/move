import { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/Map';

export default function Home() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setError(null);
        const response = await axios.get('http://localhost:5000/api/hello');
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching message:', error);
        setError('Erro ao conectar com o servidor. Certifique-se que o backend está rodando na porta 5000.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    }}>
      <h1 className="text-2xl font-bold mb-4">Move App</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p className="mb-4">{message}</p>
      )}

      <div className="w-full h-[400px] rounded-lg overflow-hidden">
        <Map />
      </div>
    </div>
  );
} 