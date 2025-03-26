import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hello');
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching message:', error);
        setMessage('Error connecting to API');
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
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <h1>Move App</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
} 