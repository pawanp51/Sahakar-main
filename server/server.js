const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Projectcreation = require('./Schema/Projectcreation');
const GISRequest = require('./Schema/GISrequest');
// const Lines = require('./Schema/Lines');
// const InventoryRequest = require('./Schema/InventoryRequest');
const Complaints = require('./Schema/Complaints');
const GISmap = require('./Schema/GISmap');
const GISRequestAccept = require('./Schema/GISrequestaccept');
const Points = require('./Schema/Points');
const router = require("./routes/routing");
const {app, server} = require("./socket/index");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/api", router);

// Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// MongoDB connection
mongoose.connect("mongodb+srv://pawan:pawanpatil51@cluster0.bzdcd.mongodb.net/", {
  dbName: 'Sahakar',
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

  const loginrouter = require('./router/login');
  const projectrouter = require('./router/project');
  const taskrouter = require('./router/task');
  const getfilesrouter = require('./router/file');
  const pointRouter = require('./router/pointRouter')
  app.use("/",loginrouter)
  app.use("/projects",projectrouter);
  app.use("/tasks",taskrouter);
  app.use("/getfiles",getfilesrouter);
  app.use("/api/points", pointRouter);

  // file handling
const multer = require('multer');
const storage = multer.memoryStorage();  // Store files in memory as Buffer
const upload = multer({ storage: storage }).array('files', 10); // Accepts up to 10 files
const File = require("./Schema/TaskFileSchema");
app.post('/upload', upload, async (req, res) => {
    try {
      if (!req.files) {
        return res.status(400).json({ message: 'No files uploaded' });
      }
  
      const files = req.files;  // Files array sent from frontend
      const {task_id,to} = req.body;
      
      
      // Store multiple files in the database
      const fileRecords = await Promise.all(files.map(file => {
        const fileRecord = new File({
          fileData: file.buffer,
          contentType: file.mimetype,
          originalName: file.originalname,
          size: file.size,
          task_id: task_id,
          to: to, 
        });
        return fileRecord.save();
      }));
      
      console.log('files recorded successfully');
      res.status(200).json({ message: 'Files uploaded successfully', files: fileRecords });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'File upload failed', error: error.message });
    }
})

// Project Creation POST request
app.post('/api/projectcreation', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const newProjectLat = parseFloat(latitude);
    const newProjectLon = parseFloat(longitude);

    const existingProjects = await Projectcreation.find();

    for (let project of existingProjects) {
      const existingProjectLat = parseFloat(project.latitude);
      const existingProjectLon = parseFloat(project.longitude);

      if (!isNaN(existingProjectLat) && !isNaN(existingProjectLon)) {
        const distance = calculateDistance(
          newProjectLat,
          newProjectLon,
          existingProjectLat,
          existingProjectLon
        );

        if (distance <= 5) {
          return res.status(400).json({
            message: 'Project overlap warning: Another project is within 5km of this location.',
            distance: distance.toFixed(2),
          });
        }
      }
    }

    const projectcreation = new Projectcreation(req.body);
    await projectcreation.save();
    res.status(201).json({ message: 'Project created successfully', project: projectcreation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/projectcreation', async (req, res) => {
  try {
    const projects = await Projectcreation.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/gisrequest', async (req, res) => {
  try {
    const gisRequest = new GISRequest(req.body);
    await gisRequest.save();
    res.status(201).json({ message: 'GIS Request submitted successfully', request: gisRequest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// app.get('/api/gisrequests', async (req, res) => {
//   try {
//     if (!req.manager || !req.manager.department) {
//       return res.status(403).json({ error: 'Access denied' });
//     }
//     const managerDepartment = req.manager.department;
//     const gisRequests = await GISRequest.find({ requestDepartment: managerDepartment });

//     if (gisRequests.length === 0) {
//       return res.status(404).json({ message: 'No GIS requests found for your department' });
//     }

//     res.status(200).json(gisRequests);
//   } catch (error) {
//     console.error('Error fetching GIS requests:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.get('/api/gisrequest', async (req, res) => {
  try {
    const gisRequests = await GISRequest.find();

    if (gisRequests.length === 0) {
      return res.status(404).json({ message: 'No GIS requests found' });
    }

    res.status(200).json(gisRequests);
  } catch (error) {
    console.error('Error fetching GIS requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/gis-maps', async (req, res) => {
  try {
    const gisMaps = await GISmap.find();
    res.status(200).json(gisMaps);
  } catch (error) {
    console.error('Error fetching GIS maps:', error);
    res.status(500).json({ message: 'Failed to fetch GIS maps' });
  }
});

app.post('/api/gis-maps', async (req, res) => {
  const { cityName, departmentName, projectName, coordinates } = req.body;

  if (!cityName || !departmentName || !projectName || !coordinates) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newGISMap = new GISmap({ cityName, departmentName, projectName, coordinates });
    await newGISMap.save();
    res.status(201).json({ message: 'GIS data saved successfully', data: newGISMap });
  } catch (error) {
    console.error('Error saving GIS data:', error);
    res.status(500).json({ message: 'Failed to save GIS data' });
  }
});

// app.post('/api/lines', async (req, res) => {
//   try {
//     let { coordinates, email, department } = req.body;

//     console.log('Raw coordinates received:', JSON.stringify(coordinates, null, 2)); 

//     if (!coordinates || !email || !department) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     if (typeof coordinates === 'string') {
//       coordinates = JSON.parse(coordinates);
//       console.log('Parsed coordinates:', JSON.stringify(coordinates, null, 2));
//     }

//     if (
//       !Array.isArray(coordinates) ||
//       !coordinates.every(arr =>
//         Array.isArray(arr) &&
//         arr.every(innerArr =>
//           Array.isArray(innerArr) &&
//           innerArr.every(num => typeof num === 'number')
//         )
//       )
//     ) {
//       return res.status(400).json({ error: 'Invalid line coordinates format' });
//     }

//     const line = new Lines({ coordinates, email, department });
//     await line.save();

//     res.status(201).json({ message: 'Line saved successfully', line });
//   } catch (error) {
//     console.error('Error saving line:', error.message);
//     res.status(500).json({ error: 'Failed to save line' });
//   }
// });


// app.get('/api/lines', async (req, res) => {
//   const { email, department } = req.query;

//   try {
//     const lines = await Lines.find({ email, department });
//     if (!lines || lines.length === 0) {
//       return res.status(404).json({ message: 'No lines found for the given employee.' });
//     }
//     res.json(lines);
//   } catch (error) {
//     console.error('Error fetching lines:', error);
//     res.status(500).json({ message: 'Failed to fetch lines.' });
//   }
// });

app.post('/api/inventoryrequest', async (req, res) => {
  try {
    const { resourceName, quantity, requestedBy, department } = req.body;

    if (!resourceName || !quantity || !requestedBy || !department) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newRequest = new ResourceRequest({
      resourceName,
      quantity,
      requestedBy,
      department,
    });

    await newRequest.save();
    res.status(201).json({ message: 'Inventory request created successfully', request: newRequest });
  } catch (error) {
    console.error('Error creating resource request:', error.message);
    res.status(500).json({ error: 'Failed to create resource request' });
  }
});

app.get('/api/inventoryrequest', async (req, res) => {
  try {
    const resourceRequests = await ResourceRequest.find();

    if (!resourceRequests || resourceRequests.length === 0) {
      return res.status(404).json({ message: 'No inventory requests found' });
    }

    res.status(200).json(resourceRequests);
  } catch (error) {
    console.error('Error fetching inventory requests:', error.message);
    res.status(500).json({ error: 'Failed to fetch inventory requests' });
  }
});

(async () => {
  const dummyComplaints = [
    { name: 'Alice', description: 'Road is damaged in my area.', date: new Date(), location: 'Area A', department: null },
    { name: 'Bob', description: 'No electricity for two days.', date: new Date(), location: 'Area B', department: null },
    { name: 'Charlie', description: 'Garbage collection is irregular.', date: new Date(), location: 'Area C', department: null },
  ];

  await Complaints.insertMany(dummyComplaints);
  console.log('Dummy data inserted');
})();

app.post('/api/complaints', async (req, res) => {
  try {
    const complaint = new Complaints(req.body);
    await complaint.save();

    const department = await classifyDepartment(complaint.description);
    complaint.department = department;
    await complaint.save();

    console.log(`Assigned '${complaint.description}' to department: '${department}'`);
    res.status(201).json(complaint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/complaints', async (req, res) => {
  try {
    const complaints = await Complaints.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/complaints/:department', async (req, res) => {
  try {
    const department = req.params.department;
    const complaints = await Complaints.find({ department });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/complaints/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { department } = req.body;

    const complaint = await Complaints.findByIdAndUpdate(
      id,
      { department },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.status(200).json(complaint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/send-coordinates', async (req, res) => {
  const { coordinates, email } = req.body;

  if (!coordinates || !email) {
    return res.status(400).json({ message: 'Coordinates and email are required.' });
  }

  try {
    const newRequest = new GISRequestAccept({ coordinates, email });
    await newRequest.save();
    res.status(200).json({ message: 'Coordinates and email saved successfully.' });
  } catch (err) {
    console.error('Error saving request:', err);
    res.status(500).json({ message: 'Failed to save request.', error: err.message });
  }
});

app.get('/api/send-coordinates/:email', async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    if (email === 'pranav.patil221@pccoepune.org') {
      const data = await GISRequestAccept.find({ email });
      return res.status(200).json({ message: 'Data retrieved successfully.', data });
    } else {
      return res.status(404).json({ message: 'No data found for this email.' });
    }
  } catch (err) {
    console.error('Error retrieving data:', err);
    res.status(500).json({ message: 'Failed to retrieve data.', error: err.message });
  }
});



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
