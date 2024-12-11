import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

// Component for drawing rectangles
const RectangleMarker = ({ addRectangle, setFirstClick, firstClick }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      if (!firstClick) {
        setFirstClick({ lat, lng });
      } else {
        const lat1 = firstClick.lat;
        const lng1 = firstClick.lng;
        const lat2 = lat;
        const lng2 = lng;

        const topLeft = { lat: Math.max(lat1, lat2), lng: Math.min(lng1, lng2) };
        const topRight = { lat: Math.max(lat1, lat2), lng: Math.max(lng1, lng2) };
        const bottomLeft = { lat: Math.min(lat1, lat2), lng: Math.min(lng1, lng2) };
        const bottomRight = { lat: Math.min(lat1, lat2), lng: Math.max(lng1, lng2) };

        addRectangle([  
            [{ lat: topLeft.lat, lng: topLeft.lng }, { lat: topRight.lat, lng: topRight.lng }],
            [{ lat: topRight.lat, lng: topRight.lng }, { lat: bottomRight.lat, lng: bottomRight.lng }],
            [{ lat: bottomRight.lat, lng: bottomRight.lng }, { lat: bottomLeft.lat, lng: bottomLeft.lng }],
            [{ lat: bottomLeft.lat, lng: bottomLeft.lng }, { lat: topLeft.lat, lng: topLeft.lng }],
        ]);

        setFirstClick(null);
      }
    },
  });

  return null;
};

// Main GIS Directory Component
const GISDirectory = ({ email }) => {
  const [gisMaps, setGISMaps] = useState([]);
  const [firstClick, setFirstClick] = useState(null);
  const [rectangleLines, setRectangleLines] = useState([]);
  const [selectedMaps, setSelectedMaps] = useState([]); // To keep track of selected maps

  // Fetch GIS Maps Data
  useEffect(() => {
    const fetchGISMaps = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/gis-maps');
        setGISMaps(response.data);
      } catch (err) {
        console.error('Error fetching GIS maps:', err.response?.data || err.message);
      }
    };

    fetchGISMaps();
  }, []);

  // Add new rectangle
  const addRectangle = (newRectangle) => {
    setRectangleLines((prevRectangles) => [...prevRectangles, newRectangle]);
  };

  // Toggle selection of GIS map
  const toggleMapSelection = (mapId) => {
    setSelectedMaps((prevSelectedMaps) =>
      prevSelectedMaps.includes(mapId)
        ? prevSelectedMaps.filter((id) => id !== mapId)
        : [...prevSelectedMaps, mapId]
    );
  };

  // Send selected GIS maps' coordinates to the backend
  const sendCoordinates = async () => {
    try {
      // Collect all coordinates from selected GIS maps
      const selectedCoordinates = gisMaps
        .filter((map) => selectedMaps.includes(map._id))
        .flatMap((map) => map.coordinates);

      if (selectedCoordinates.length > 0) {
        await axios.post('http://localhost:3000/api/send-coordinates', {
          coordinates: selectedCoordinates,
          email,
        });
        alert('Coordinates sent successfully!');
      } else {
        alert('No GIS maps selected.');
      }
    } catch (err) {
      console.error('Error sending coordinates:', err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">GIS Directory</h1>
      <div className="space-y-6">
        {gisMaps.map((map, mapIndex) => (
          <div
            key={map._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-300 flex flex-col md:flex-row"
          >
            <div className="flex-1 mb-4 md:mb-0 md:mr-4">
              <h2 className="text-lg font-bold">{map.cityName}</h2>
              <p>Project: {map.projectName}</p>
              <p>Department: {map.departmentName}</p>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`map-${map._id}`}
                  checked={selectedMaps.includes(map._id)}
                  onChange={() => toggleMapSelection(map._id)}
                  className="mr-2"
                />
                <label htmlFor={`map-${map._id}`} className="text-sm">Select this map</label>
              </div>
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
                {rectangleLines.map((rectangle, index) => (
                  <div key={index}>
                    {rectangle.map((line, lineIndex) => (
                      <Polyline key={`${index}-${lineIndex}`} positions={line} color="red" />
                    ))}
                  </div>
                ))}
                <RectangleMarker
                  addRectangle={addRectangle}
                  setFirstClick={setFirstClick}
                  firstClick={firstClick}
                />
              </MapContainer>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          onClick={sendCoordinates}
        >
          Send Selected Coordinates
        </button>
      </div>
    </div>
  );
};

export default GISDirectory;
