import React, { useEffect, useState } from 'react';
import { usegeotagContext } from '../../ContextApi/geotagcontext';
import { useLoginContext } from '../../ContextApi/Logincontext';

const Conflict = () => {
  const { allpts } = usegeotagContext();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [checked, setChecked] = useState(false);
  const [conflicts, setConflicts] = useState([]);
  const [reqnoc,setreqnoc] = useState(true);
 const {user} = useLoginContext();
 


    async function handlerefresh(){
        // console.log(user);
        
        const response = await fetch("http://localhost:3000/tasks",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:user.Email})
      
          });
          const res = await response.json();

          for( const r of res ){
            for(const con of conflicts){
                console.log("con.projectName :",con.projectName);
                console.log("r.task_name :",r.task_name);
                
                if(r.task_name === con.projectName && r.status==="completed"){
                    console.log("got at ",con.projectName);
                    
                    setConflicts(conflicts.filter((con)=>{return con.projectName!=r.task_name}))
                }
            }
          }
          
          console.log("response",res);
          
          console.log(conflicts);
          

    }

    async function handleRegister(){
        var array = [];
        allpts.map((pt)=>{
            array.push([pt[0],pt[1]]);
        })

        var rec = {
            projectName:allpts[0][2],
            department:user.department,
            coordinates:array,
            color:allpts[0][3],
        }
        
        console.log("rec :",rec);
        
        const response = await fetch("http://localhost:3000/api/points",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(rec),
        })
        console.log(response);
    }

//   const [formData, setFormData] = useState(null);
  async function handleNOC() {
    conflicts.map(async(conflict)=>{

      var record = {
            manager_email: 'dummy@gmail.com',
            employee_email: user.Email,
            taskName: conflict.projectName,
            date: new Date(),
        assignedBy: user.username,
        department: conflict.department,
        status: 'pending',
        post: 'Na',
        time: new Date(),
        priority: 'high',
        deadline: '21 days',
        description: `conflict has arrised in plotting of project ${conflict.projectName} please review it`,
        additionalNotes:"Na",
        references: 'Na',
        type:'conflict'
    }
    
    
    const response = await fetch("http://localhost:3000/tasks/assigntask",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
    })
    console.log(response);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    alert("request sent plz wait");
})
}

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

  async function checkpts() {
    if (!data || !allpts) return;

    const newConflicts = [];

    for (const pt of allpts) {
      const lat = pt[0];
      const lng = pt[1];

      for (const record of data) {
        record.coordinates.forEach((point) => {
          const dist = calculateDistance(lat, lng, point[0], point[1]);
          if (dist <= 1) {
            if (!newConflicts.some(conf => conf.projectName === record.projectName)) {
              newConflicts.push({ projectName: record.projectName, department: record.department });
            }
          }
        });
      }
    }

    setConflicts(newConflicts);
    setChecked(true); // Mark the check as completed
  }

  async function getPoints() {
    try {
      const response = await fetch("http://localhost:3000/api/points");
      const res = await response.json();
      setData(res);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching points:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!data) {
      getPoints();
    } else if (!checked) {
      checkpts();
    }
  }, [data, checked, allpts]);

  useEffect(()=>{
    if(conflicts.length===0){
      setreqnoc(false);
    }
  },[conflicts])
  return (
    <div>
      <h1>Conflicts</h1>
      <button onClick={handlerefresh}>refresh</button>
      {loading ? (
        <p>Loading...</p>
      ) : conflicts.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>#</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Conflict Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" }}>Conflict Department</th>
            </tr>
          </thead>
          <tbody>
            {conflicts.map((conflict, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>{index + 1}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px", color: "red", fontWeight: "bold" }}>{conflict.projectName}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px", color: "red", fontWeight: "bold" }}>{conflict.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No conflicts found.</p>
      )}

{conflicts.length > 0 ? (
  <button
    type="submit"
    onClick={handleNOC}
    className="px-4 py-2 mt-16 ml-8 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    Request NOC
  </button>
) : (
  <button
    onClick={handleRegister}
    className="px-4 py-2 mt-16 ml-8 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
  >
    Register Project
  </button>
)}

    </div>
  );
};

export default Conflict;
