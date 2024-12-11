// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import axios from 'axios';
// import { useLoginContext } from '../../ContextApi/Logincontext';

// const UpdateMapCenter = ({ center }) => {
//   const map = useMap();
//   useEffect(() => {
//     if (center) {
//       map.setView(center, map.getZoom());
//     }
//   }, [center, map]);
//   return null;
// };

// const Geotagging = () => {
//   const { user } = useLoginContext();
//   const [lines, setLines] = useState([]);
//   const [center, setCenter] = useState([18.5204, 73.8567]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchGISData = async () => {
//       try {
//         // setError('');
//         // const linesResponse = await axios.get('http://localhost:3000/api/lines', {
//         //   params: { email: user.Email, department: user.department },
//         // });

//         setLines(linesResponse.data.map(line => line.coordinates));

//         const gisRequestResponse = await axios.get('http://localhost:3000/api/gisrequest');
//         const employeeRequest = gisRequestResponse.data.find(
//           request =>
//             request.email === user.Email && request.yourDepartment === user.department
//         );

//         if (employeeRequest && employeeRequest.latitude && employeeRequest.longitude) {
//           setCenter([employeeRequest.latitude, employeeRequest.longitude]);
//         } else {
//           console.warn('No GIS request found for this employee.');
//         }
//       } catch (err) {
//         console.error('Error fetching GIS data:', err.response?.data || err.message);
//         setError('Failed to load GIS data.');
//       }
//     };
//     if(user){

//       fetchGISData();
//     }
//   }, [user]);

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-lg text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4 relative">
//       <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8 mb-4">
//         <h1 className="text-2xl font-bold mb-4">Department GIS</h1>

//         <div className="relative z-10">
//           <MapContainer
//             center={center}
//             zoom={13}
//             className="h-96 w-full rounded-md"
//             style={{ zIndex: 1 }}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
//             />
//             <UpdateMapCenter center={center} />
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
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

// const customMarkerIcon = new L.Icon({
//   iconUrl: markerIconPng,
//   shadowUrl: markerShadowPng,
//   iconSize: [20, 32],
//   iconAnchor: [10, 32],
//   popupAnchor: [1, -34],
//   shadowSize: [32, 32],
// });

// Dummy array of coordinates
const dummyLines = [
  [[18.5277, 73.8638], [18.5244, 73.8700]],
  [[18.5244, 73.8701], [18.5210, 73.8717]],
  [[18.5210, 73.8717], [18.5184, 73.8797]],
  [[18.5182, 73.8797], [18.5106, 73.8803]],
  [[18.5105, 73.8803], [18.5072, 73.8796]],
  [[18.5106, 73.8803], [18.5105, 73.8814]],
  [[18.5105, 73.8815], [18.5105, 73.8823]],
  [[18.5137, 73.8801], [18.5143, 73.8835]],
  [[18.5255, 73.8676], [18.5206, 73.8674]],
  [[18.5205, 73.8675], [18.5194, 73.8684]],
  [[18.5193, 73.8684], [18.5158, 73.8686]],
  [[18.5158, 73.8686], [18.5119, 73.8688]],
  [[18.5119, 73.8688], [18.5095, 73.8682]],
  [[18.5248, 73.8535], [18.5245, 73.8526]],
  [[18.5244, 73.8526], [18.5213, 73.8535]],
  [[18.5213, 73.8535], [18.5210, 73.8535]],
  [[18.5210, 73.8535], [18.5206, 73.8510]],
  [[18.5193, 73.8625], [18.5180, 73.8632]],
  [[18.5179, 73.8631], [18.5161, 73.8629]],
  [[18.5161, 73.8629], [18.5156, 73.8570]],
  [[18.5157, 73.8580], [18.5172, 73.8581]],
  [[18.5156, 73.8580], [18.5114, 73.8586]],
  [[18.5273, 73.8491], [18.5254, 73.8486]],
  [[18.5254, 73.8485], [18.5262, 73.8468]],
  [[18.5262, 73.8467], [18.5264, 73.8446]],
  [[18.5264, 73.8446], [18.5268, 73.8424]],
  [[18.5266, 73.8436], [18.5273, 73.8437]],
  [[18.5265, 73.8438], [18.5243, 73.8434]],
  [[18.5257, 73.8478], [18.5217, 73.8458]],
  [[18.5217, 73.8458], [18.5212, 73.8467]],
  [[18.5217, 73.8458], [18.5227, 73.8411]],
  [[18.5234, 73.8466], [18.5228, 73.8481]],
  [[18.5194, 73.8625], [18.5199, 73.8625]],
  [[18.5196, 73.8625], [18.5196, 73.8637]],
  [[18.5196, 73.8636], [18.5195, 73.8648]],
  [[18.5195, 73.8648], [18.5195, 73.8667]],
  [[18.5199, 73.8625], [18.5203, 73.8647]],
  [[18.5199, 73.8625], [18.5202, 73.8625]],
  [[18.5202, 73.8625], [18.5205, 73.8630]],
  [[18.5196, 73.8625], [18.5190, 73.8605]],
  [[18.5190, 73.8605], [18.5186, 73.8597]],
  [[18.5040, 73.8558], [18.5039, 73.8588]],
  [[18.5038, 73.8592], [18.5037, 73.8611]],
  [[18.5037, 73.8612], [18.5031, 73.8616]],
  [[18.5031, 73.8615], [18.5021, 73.8617]],
  [[18.5021, 73.8617], [18.5002, 73.8632]],
  [[18.5016, 73.8620], [18.5003, 73.8619]],
  [[18.5010, 73.8619], [18.5011, 73.8624]],
  [[18.5040, 73.8562], [18.5065, 73.8561]],
  [[18.5043, 73.8561], [18.5043, 73.8559]],
  [[18.5043, 73.8559], [18.5044, 73.8556]],
  [[18.5044, 73.8556], [18.5058, 73.8541]],
  [[18.5058, 73.8540], [18.5066, 73.8540]],
  [[18.5067, 73.8540], [18.5067, 73.8543]],
  [[18.5067, 73.8543], [18.5071, 73.8543]],
  [[18.5163, 73.8500], [18.5164, 73.8536]],
  [[18.5163, 73.8500], [18.5169, 73.8500]],
  [[18.5168, 73.8500], [18.5180, 73.8501]],
  [[18.5163, 73.8500], [18.5125, 73.8503]],
  [[18.5163, 73.8500], [18.5161, 73.8481]],
  [[18.5180, 73.8501], [18.5196, 73.8496]],
  [[18.5125, 73.8503], [18.5123, 73.8505]],
  [[18.5123, 73.8505], [18.5083, 73.8511]],
  [[18.5117, 73.8506], [18.5114, 73.8483]],
  [[18.5117, 73.8506], [18.5118, 73.8522]],
  [[18.5124, 73.8504], [18.5121, 73.8475]],
  [[18.5124, 73.8504], [18.5127, 73.8528]],
  [[18.5126, 73.8525], [18.5136, 73.8524]],
  [[18.5131, 73.8525], [18.5128, 73.8503]]
  // Add more lines as needed from your provided coordinates
];

const Geotagging = () => {
  // const [projectLocations, setProjectLocations] = useState([]);

  // const predefinedProjects = [
  //   { name: 'Gas Pipeline Project', coordinates: [18.5204, 73.8567] }, 
  //   { name: 'Road Construction', coordinates: [18.529, 73.844] },
  //   { name: 'Water Pipeline', coordinates: [18.51, 73.86] },
  //   { name: 'School Renovation', coordinates: [18.530, 73.865] },
  // ];

  // useEffect(() => {
  //   setProjectLocations(predefinedProjects);
  // }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8 mb-4">
        <h1 className="text-2xl font-bold mb-4">Department GIS</h1>

        <div className="relative z-10">
          <MapContainer
            center={[18.5204, 73.8567]} 
            zoom={13}
            className="h-96 w-full rounded-md"
            style={{ zIndex: 1 }} 
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />

            {/* {projectLocations.map((project, index) => (
              <Marker
                key={index}
                position={project.coordinates}
                icon={customMarkerIcon}
              >
                <Popup>
                  <span>{project.name}</span>
                </Popup>
              </Marker>
            ))} */}

            {/* Render dummy lines on the map */}
            {dummyLines.map((line, index) => (
              <Polyline key={index} positions={line} color="blue" />
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Geotagging;