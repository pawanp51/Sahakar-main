//express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017',{
    dbName : 'Sahakar',
})

.then(()=> {console.log('connected to database');})
.catch((e)=> {console.log('error in connecting to database',e);})

//cors
const cors = require('cors');
const corsOptions = {
    origin : "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true, 
};
app.use(cors(corsOptions));


const loginrouter = require('./router/login');
const projectrouter = require('./router/project');
const taskrouter = require('./router/task');
app.use("/",loginrouter)
app.use("/projects",projectrouter);
app.use("/tasks",taskrouter);

//listen
const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
})