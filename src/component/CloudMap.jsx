import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CloudMap = () => {
  const [mapUrl, setMapUrl] = useState('');

  useEffect(() => {
    const apiKey = '7a32b7adfc5c445b589ee707eeff4c90';
    const layer = 'clouds_new';
    const zoom = 10;
    const x = 123;
    const y = 456;

    const apiUrl = `https://tile.openweathermap.org/map/${layer}/${zoom}/${x}/${y}.png?appid=${apiKey}`;

    axios
      .get(apiUrl, { responseType: 'blob' })
      .then(response => {
        const blobUrl = URL.createObjectURL(response.data);
        setMapUrl(blobUrl);
      })
      .catch(error => {
        console.log('Error fetching cloud map:', error);
      });
  }, []);

  return (
    <div>
      {mapUrl ? (
        <img src={mapUrl} alt="Cloud Map" />
      ) : (
        <p>Loading cloud map...</p>
      )}
    </div>
  );
};

export default CloudMap;
