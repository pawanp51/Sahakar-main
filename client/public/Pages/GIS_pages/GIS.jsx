// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import markerIconPng from 'leaflet/dist/images/marker-icon.png';
// import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

// const customMarkerIcon = new L.Icon({
//   iconUrl: markerIconPng,
//   shadowUrl: markerShadowPng,
//   iconSize: [20, 32],
//   iconAnchor: [10, 32],
//   popupAnchor: [1, -34],
//   shadowSize: [32, 32],
// });

// // const MapClickHandler = ({ selectedPoints, setSelectedPoints, lines, setLines }) => {
// //   useMapEvents({
// //     click(e) {
// //       const { lat, lng } = e.latlng;

// //       if (selectedPoints.length < 2) {
// //         setSelectedPoints([...selectedPoints, [lat, lng]]);
// //       }

// //       if (selectedPoints.length === 1) {
// //         setLines([...lines, [...selectedPoints, [lat, lng]]]);
// //         setSelectedPoints([]);
// //       }
// //     },
// //   });

// //   return null;
// // };

// const Geotagging = () => {
//   const [projectLocations, setProjectLocations] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [projectName, setProjectName] = useState('');
//   const [lat, setLat] = useState('');
//   const [lng, setLng] = useState('');

//   const predefinedProjects = [
//     { name: 'Gas Pipeline Project', coordinates: [18.5204, 73.8567] }, // Example coordinates for Pune
//     { name: 'Road Construction', coordinates: [18.529, 73.844] },
//     { name: 'Water Pipeline', coordinates: [18.51, 73.86] },
//     { name: 'School Renovation', coordinates: [18.530, 73.865] },
//   ];

//   // Load predefined projects on initial load
//   useEffect(() => {
//     setProjectLocations(predefinedProjects);
//   }, []);

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (projectName && lat && lng) {
//       const newProject = {
//         name: projectName,
//         coordinates: [parseFloat(lat), parseFloat(lng)],
//       };
//       setProjectLocations([...projectLocations, newProject]);
//       setProjectName('');
//       setLat('');
//       setLng('');
//       setIsModalOpen(false);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4 relative">
//       <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8 mb-4">
//         <h1 className="text-2xl font-bold mb-4">Geo Tagging System</h1>

//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-md"
//         >
//           Add New Project
//         </button>

//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-60">
//               <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
//               <form onSubmit={handleFormSubmit} className="space-y-4">
//                 <div>
//                   <label className="block mb-1 font-semibold" htmlFor="projectName">
//                     Project Name
//                   </label>
//                   <input
//                     id="projectName"
//                     type="text"
//                     value={projectName}
//                     onChange={(e) => setProjectName(e.target.value)}
//                     placeholder="Enter project name"
//                     className="w-full p-2 border rounded-md"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 font-semibold" htmlFor="latitude">
//                     Latitude
//                   </label>
//                   <input
//                     id="latitude"
//                     type="number"
//                     value={lat}
//                     onChange={(e) => setLat(e.target.value)}
//                     placeholder="Enter latitude"
//                     className="w-full p-2 border rounded-md"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 font-semibold" htmlFor="longitude">
//                     Longitude
//                   </label>
//                   <input
//                     id="longitude"
//                     type="number"
//                     value={lng}
//                     onChange={(e) => setLng(e.target.value)}
//                     placeholder="Enter longitude"
//                     className="w-full p-2 border rounded-md"
//                     required
//                   />
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <button
//                     type="submit"
//                     className="bg-green-500 text-white py-2 px-4 rounded-md"
//                   >
//                     Add Project
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="bg-red-500 text-white py-2 px-4 rounded-md"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         <div className="relative z-10">
//           <MapContainer
//             center={[18.5204, 73.8567]} // Pune coordinates
//             zoom={13}
//             className="h-96 w-full rounded-md"
//             style={{ zIndex: 1 }} // Make sure the map has proper z-index
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
//             />

//             {/* <MapClickHandler
//               selectedPoints={selectedPoints}
//               setSelectedPoints={setSelectedPoints}
//               lines={lines}
//               setLines={setLines}
//             /> */}

//             {/* Project Markers */}
//             {projectLocations.map((project, index) => (
//               <Marker
//                 key={index}
//                 position={project.coordinates}
//                 icon={customMarkerIcon}
//               >
//                 <Popup>
//                   <span>{project.name}</span>
//                 </Popup>
//               </Marker>
//             ))}

//             {/* Polylines between points */}
//             {/* {lines.map((line, index) => (
//               <Polyline key={index} positions={line} color="blue" />
//             ))} */}
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Geotagging;

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios'; 

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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/projectcreation');
        const projects = response.data.map(project => ({
          name: project.projectTitle,
          coordinates: [parseFloat(project.latitude), parseFloat(project.longitude)]
        }));
        setProjectLocations(projects);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8 mb-4">
        <h1 className="text-2xl font-bold mb-4">Geo Tagging System</h1>

        <div className="relative z-10">
          <MapContainer
            center={[18.5204, 73.8567]} // Pune coordinates
            zoom={13}
            className="h-96 w-full rounded-md"
            style={{ zIndex: 1 }}
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
      </div>
    </div>
  );
};

export default Geotagging;
