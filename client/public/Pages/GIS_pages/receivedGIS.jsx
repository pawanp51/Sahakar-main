import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const ReceivedGIS = () => {
  const [gisMaps, setGISMaps] = useState([]);

  useEffect(() => {
    const fetchGISMaps = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/send-coordinates/pranav.patil221@pccoepune.org`);
        setGISMaps(response.data.data);
      } catch (err) {
        console.error('Error fetching GIS maps:', err.response?.data || err.message);
      }
    };
  
    fetchGISMaps();
  }, []);
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">GIS Directory</h1>
      <div className="space-y-6">
        {gisMaps.length === 0 ? (
          <p>No GIS maps found for this employee.</p>
        ) : (
          gisMaps.map((map) => (
            <div
              key={map._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-300 flex flex-col md:flex-row"
            >
              <div className="flex-1 mb-4 md:mb-0 md:mr-4">
                <h2 className="text-lg font-bold">{map.cityName}</h2>
                <p>Project: {map.projectName}</p>
                <p>Department: {map.departmentName}</p>
              </div>
  
              <div className="h-96 w-full md:w-1/2">
                <MapContainer
                  center={map.coordinates.length > 0 ? map.coordinates[0] : [18.5204, 73.8567]}
                  zoom={13}
                  className="h-full w-full rounded-md"
                  style={{ zIndex: 1 }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                  />
                  {map.coordinates.length > 0 && (
                    <Polyline positions={map.coordinates} color="blue" />
                  )}
                </MapContainer>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReceivedGIS;
