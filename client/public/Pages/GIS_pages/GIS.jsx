import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Geotagging = ({ initialCenter }) => {
  const [center, setCenter] = useState(initialCenter || [18.5204, 73.8567]);
  const [lines, setLines] = useState([]); // Use state to store line coordinates
  const [colors, setColors] = useState([]);
  // Fetch points from the API
  
  async function getPoints() {
    try {
      const response = await fetch("http://localhost:3000/api/points");
      const res = await response.json();
      const allColors = [];
      const allLines = [];
      res.forEach((item) => {
        const color = item.color;
        console.log(color)
        const line = item.coordinates.map((coords) => [coords[0], coords[1]]);
        allColors.push(color);
        allLines.push(line);
      });
      setColors(allColors);
      setLines(allLines); // Update state with fetched lines
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  }

  useEffect(() => {
    if (initialCenter) {
      setCenter(initialCenter);
    }
    getPoints();
  }, [initialCenter]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8 mb-4">
        <h1 className="text-2xl font-bold mb-4">
          Create GIS for the requested latitude and longitude
        </h1>

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
            {lines.map((line, index) => (
              <Polyline key={index} positions={line} color={colors[index]} />
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Geotagging;
