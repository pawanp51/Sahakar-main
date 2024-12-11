import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const customMarkerIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [20, 32],
  iconAnchor: [10, 32],
  popupAnchor: [1, -34],
  shadowSize: [32, 32],
});

const MapClickHandler = ({ selectedPoints, setSelectedPoints, lines, setLines }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      if (selectedPoints.length < 2) {
        setSelectedPoints([...selectedPoints, [lat, lng]]);
      }

      if (selectedPoints.length === 1) {
        const newLine = [...selectedPoints, [lat, lng]];
        setLines([...lines, newLine]);
        setSelectedPoints([]);
      }
    },
  });

  return null;
};

const CreateGIS = ({ initialCenter, email, department }) => {
  const [projectLocations, setProjectLocations] = useState([]);
  const [center, setCenter] = useState(initialCenter || [18.5204, 73.8567]);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (initialCenter) {
      setCenter(initialCenter);
    }
  }, [initialCenter]);

  const handleSaveLines = async () => {
    try {
      await axios.post('http://localhost:3000/api/lines', {
        coordinates: lines,
        email,
        department,
      });
      alert('Lines saved successfully!');
      setLines([]);
    } catch (error) {
      console.error('Error saving lines:', error.response?.data || error.message);
      alert('Failed to save lines.');
    }
  };  
  

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8 mb-4">
        <h1 className="text-2xl font-bold mb-4">Create GIS for the requested latitude and longitude</h1>

        <div className="relative z-10">
          <MapContainer
            center={center}
            zoom={13}
            className="h-96 w-full rounded-md"
            style={{ zIndex: 1 }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />

            <MapClickHandler
              selectedPoints={selectedPoints}
              setSelectedPoints={setSelectedPoints}
              lines={lines}
              setLines={setLines}
            />

            {projectLocations.map((project, index) => (
              <Marker
                key={index}
                position={project.coordinates}
                icon={customMarkerIcon}
              >
                <Popup>
                  <span>{project.name}</span>
                </Popup>
              </Marker>
            ))}

            {lines.map((line, index) => (
              <Polyline key={index} positions={line} color="blue" />
            ))}
          </MapContainer>
        </div>

        <button
          onClick={handleSaveLines}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Approve Request and Send
        </button>
      </div>
    </div>
  );
};

export default CreateGIS;
