import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
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

const Geotagging = () => {
  const [projectLocations, setProjectLocations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const predefinedProjects = [
    { name: 'Gas Pipeline Project', coordinates: [18.5204, 73.8567] },
    { name: 'Road Construction', coordinates: [18.529, 73.844] },
    { name: 'Water Pipeline', coordinates: [18.51, 73.86] },
    { name: 'School Renovation', coordinates: [18.530, 73.865] },
  ];

  useEffect(() => {
    setProjectLocations(predefinedProjects);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (projectName && lat && lng) {
      const newProject = {
        name: projectName,
        coordinates: [parseFloat(lat), parseFloat(lng)],
      };
      setProjectLocations([...projectLocations, newProject]);
      setProjectName('');
      setLat('');
      setLng('');
      setIsModalOpen(false);
    }
  };

  const handleDeleteProject = (indexToDelete) => {
    setProjectLocations(projectLocations.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className={`max-w-6xl w-full bg-white shadow-md rounded-lg p-8 mb-4 ${isFullscreen ? 'hidden' : ''}`}>
        <h1 className="text-2xl font-bold mb-4 text-center">Geo Tagging System</h1>

        {/* Buttons: Add New Project and Zoom to Fullscreen */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Add New Project
          </button>
          <button
            onClick={() => setIsFullscreen(true)}
            className="bg-green-500 text-white py-2 px-4 rounded-md"
          >
            Zoom to Fullscreen
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-60">
              <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 font-semibold" htmlFor="projectName">
                    Project Name
                  </label>
                  <input
                    id="projectName"
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name"
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold" htmlFor="latitude">
                    Latitude
                  </label>
                  <input
                    id="latitude"
                    type="number"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    placeholder="Enter latitude"
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold" htmlFor="longitude">
                    Longitude
                  </label>
                  <input
                    id="longitude"
                    type="number"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    placeholder="Enter longitude"
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded-md"
                  >
                    Add Project
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-5 gap-4">
          {/* Map View - 60% */}
          <div className="col-span-3 relative z-10 h-96 w-full bg-white rounded-md shadow-md">
            <MapContainer
              center={[18.5204, 73.8567]}
              zoom={13}
              className="h-full w-full rounded-md"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
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
            </MapContainer>
          </div>

          {/* Project List View - 40% */}
          <div className="col-span-2 bg-white rounded-md shadow-md h-96 overflow-hidden">
            {/* Fixed Header */}
            <div className="bg-white z-10 border-b p-6">
              <h1 className="text-2xl font-bold">Project List</h1>
            </div>
            {/* Scrollable List */}
            <div className="overflow-y-auto h-full">
              <ul className="space-y-4 p-6">
                {projectLocations.map((project, index) => (
                  <li
                    key={index}
                    className="border p-4 rounded-md flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold text-lg">{project.name}</p>
                      <p>Latitude: {project.coordinates[0]}</p>
                      <p>Longitude: {project.coordinates[1]}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(index)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Map */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-white">
          <MapContainer
            center={[18.5204, 73.8567]}
            zoom={13}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
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
          </MapContainer>
          {/* Always visible Back Button */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="fixed top-4 right-4 bg-red-500 text-white py-2 px-4 rounded-md z-50"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Geotagging;
