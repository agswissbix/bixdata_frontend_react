import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';

// Dichiarazione interfaccia componente
interface ComponentProps {
  menuName: string;
}

// Dichiarazione interfaccia risposta backend
interface BixData {
  userId: number;
  name: string;
  email: string;
  menuItem: string;
}

// Dati di esempio per test
const mockBixData = {
  userId: 123,
  name: 'John Doe',
  email: 'johndoe@example.com',
  menuItem: 'Home'
};

const TestContent: React.FC<ComponentProps> = ({ menuName }) => {
  const [data, setData] = useState<BixData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const response = await axiosInstance.post<BixData>('test/', { menuItem: menuName });
        setData(response.data); //Dati dal backend
        //setData(mockBixData); //Dati di test
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [menuName]); // Variabile che quando cambia comporta il richiamo di useEffect

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (!data) {
    return <p>Error loading data.</p>; 
  }

  return (
    <div>
      <h1>Welcome, {data.name}</h1>
      <p>User ID: {data.userId}</p>
      <p>Email: {data.email}</p>
      <p>Menu Item: {data.menuItem}</p>
    </div>
  );
};

export default TestContent;
