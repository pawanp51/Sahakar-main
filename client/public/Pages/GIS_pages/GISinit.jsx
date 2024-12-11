import React from 'react';
import { useNavigate } from 'react-router-dom';

const GISinit = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6 h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-700">Geographic Information System</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-lg flex flex-col justify-center items-center p-6"
          style={{ height: '30vh' }}
        >
          <h2 className="text-2xl font-semibold text-white mb-6">GIS</h2>
          <button
            onClick={() => navigate('/Geotagging')}
            className="bg-white text-blue-700 py-3 px-8 rounded-lg font-medium hover:bg-gray-100"
          >
            ENTER
          </button>
        </div>

        <div
          className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-lg flex flex-col justify-center items-center p-6"
          style={{ height: '30vh' }}
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Request For GIS</h2>
          <button
            onClick={() => navigate('/GISreq')}
            className="bg-white text-blue-700 py-3 px-8 rounded-lg font-medium hover:bg-gray-100"
          >
            ENTER
          </button>
        </div>

        <div
          className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-lg flex flex-col justify-center items-center p-6"
          style={{ height: '30vh' }}
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Received Requests</h2>
          <button
            onClick={() => navigate('/IncGISreq')}
            className="bg-white text-blue-700 py-3 px-8 rounded-lg font-medium hover:bg-gray-100"
          >
            ENTER
          </button>
        </div>

        <div
          className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-lg flex flex-col justify-center items-center p-6"
          style={{ height: '30vh' }}
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Received GIS</h2>
          <button
            onClick={() => navigate('/ReceivedGIS')}
            className="bg-white text-blue-700 py-3 px-8 rounded-lg font-medium hover:bg-gray-100"
          >
            ENTER
          </button>
        </div>
      </div>
    </div>
  );
};

export default GISinit;
