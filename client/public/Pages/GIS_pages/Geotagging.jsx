import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { useLoginContext } from '../../ContextApi/Logincontext';

const UpdateMapCenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
};

const Geotagging = () => {
  const { user } = useLoginContext();
  const [lines, setLines] = useState([]);
  const [center, setCenter] = useState([18.5204, 73.8567]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGISData = async () => {
      try {
        setError('');
        const linesResponse = await axios.get('http://localhost:3000/api/lines', {
          params: { email: user.Email, department: user.department },
        });

        setLines(linesResponse.data.map(line => line.coordinates));

        const gisRequestResponse = await axios.get('http://localhost:3000/api/gisrequest');
        const employeeRequest = gisRequestResponse.data.find(
          request =>
            request.email === user.Email && request.yourDepartment === user.department
        );

        if (employeeRequest && employeeRequest.latitude && employeeRequest.longitude) {
          setCenter([employeeRequest.latitude, employeeRequest.longitude]);
        } else {
          console.warn('No GIS request found for this employee.');
        }
      } catch (err) {
        console.error('Error fetching GIS data:', err.response?.data || err.message);
        setError('Failed to load GIS data.');
      }
    };
    if(user){

      fetchGISData();
    }
  }, [user]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8 mb-4">
        <h1 className="text-2xl font-bold mb-4">Requested GIS</h1>

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
            <UpdateMapCenter center={center} />
            {lines.map((line, index) => (
              <Polyline key={index} positions={line} color="blue" />
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Geotagging;
