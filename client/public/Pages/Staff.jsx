import React, { useState } from 'react';

const Staff = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStaffRole, setSelectedStaffRole] = useState('All');

  const departments = ['All', 'Electricity', 'Civil', 'Water', 'Gas'];

  const staffMembers = [
    { name: 'Prasad', role: 'Junior Engineer', department: 'Electricity', contact: '9876543210', image: 'https://media.licdn.com/dms/image/v2/D4D03AQFIWZSb-iFcGQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730569511345?e=1736380800&v=beta&t=6pvYD7uwrqWNEzb8lhxF0JmshdeB0WExgmqEi759Ubk' },
    { name: 'Ashish', role: 'Senior Engineer', department: 'Electricity', contact: '8765432109', image: 'https://media.licdn.com/dms/image/v2/D4D03AQE4idWwoLynhg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1711172568221?e=1736380800&v=beta&t=rHk7y29eBa9mlmQmR_M3ptIzWDafKAYU4q88GeD6W60' },
    { name: 'Payal', role: 'Technician', department: 'Electricity', contact: '7654321098', image: 'https://media.licdn.com/dms/image/v2/D4D03AQFazMrMGuNpyg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1708184970629?e=1736380800&v=beta&t=rGZtLV_g53g--7KnyxFbYvkDwtI-evsiZayhH6iImJk' },
    { name: 'Siddhesh', role: 'Supervisor', department: 'Electricity', contact: '6543210987', image: 'https://media.licdn.com/dms/image/v2/D4D03AQG9cFml989seA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1723056267422?e=1736380800&v=beta&t=VtjoUL3z_zQguFLLpUg3vhZl67q5hHMitKZDLqsjEhQ' },
    { name: 'Pranav', role: 'Manager', department: 'Electricity', contact: '5432109876', image: 'https://media.licdn.com/dms/image/v2/D4D03AQGY83fjFeURDQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1730282011039?e=1736380800&v=beta&t=z7_V1GlWdy54ruxeruQLlXQ5_3HQDJ_IJSyfMClURaM' },
    { name: 'Pawan', role: 'Safety Officer', department: 'Electricity', contact: '4321098765', image: 'https://media.licdn.com/dms/image/v2/D4D35AQGeEzX0f0w1tw/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1724041981201?e=1731574800&v=beta&t=aNWdQm_l3Ek0CppG-jVJf2yfGuh2-0lWq6vmtVn8RIY' },
    { name: 'Nikhil', role: 'Electrician', department: 'Electricity', contact: '3210987654', image: '/Images/bill.jpg' },
    { name: 'Rohit', role: 'Junior Civil Engineer', department: 'Civil', contact: '2109876543', image: '/Images/bill.jpg' },
    { name: 'Amit', role: 'Site Supervisor', department: 'Civil', contact: '1987654321', image: '/Images/bill.jpg' },
    { name: 'Kavita', role: 'Project Manager', department: 'Civil', contact: '8765432198', image: '/Images/bill.jpg' },
    { name: 'Rahul', role: 'Surveyor', department: 'Civil', contact: '9876543212', image: '/Images/bill.jpg' },
    { name: 'Sneha', role: 'Draftsman', department: 'Civil', contact: '8765432112', image: '/Images/bill.jpg' },
  ];

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setSelectedStaffRole('All');
  };

  const handleStaffChange = (e) => {
    setSelectedStaffRole(e.target.value);
  };

  const handleBack = () => {
    setSelectedDepartment('All');
    setSelectedStaffRole('All');
  };

  const filteredStaff = staffMembers.filter((staff) => {
    return (
      (selectedDepartment === 'All' || staff.department === selectedDepartment) &&
      (selectedStaffRole === 'All' || staff.role === selectedStaffRole)
    );
  });

  return (
    <div className="min-h-screen bg-gray-10 p-8">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">STAFF MEMBERS</h2>
      <form className="space-y-6">
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div>
              <label htmlFor="department" className="block text-lg font-medium text-gray-600">Department:</label>
              <select
                id="department"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
              >
                {departments.map((department) => (
                  <option key={department} value={department}>{department}</option>
                ))}
              </select>
            </div>
            {selectedDepartment && (
              <div>
                <label htmlFor="staff" className="block text-lg font-medium text-gray-600">Staff Role:</label>
                <select
                  id="staff"
                  value={selectedStaffRole}
                  onChange={handleStaffChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                >
                  <option value="All">All Roles</option>
                  {[...new Set(staffMembers.filter(staff => selectedDepartment === 'All' || staff.department === selectedDepartment).map(staff => staff.role))].map((role, index) => (
                    <option key={index} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </section>
        {filteredStaff.length > 0 && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredStaff.map((staff, index) => (
                <div key={index} className="p-6 bg-white border border-blue-700 rounded-lg shadow-lg text-center hover:shadow-2xl transition-shadow duration-200">
                  <img src={staff.image} alt={staff.name} className="w-48 h-48 mx-auto rounded-full mb-4" />
                  <p className="text-xl font-bold text-black">{staff.name}</p>
                  <p className="text-md text-gray-600">{staff.role}</p>
                  <p className="text-md text-gray-600">{staff.department} Department</p>
                  <p className="text-md text-gray-600">{staff.contact}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {(selectedDepartment !== 'All' || selectedStaffRole !== 'All') && (
          <div className="flex justify-end max-w-2xl mx-auto">
            <button
              onClick={handleBack}
              type="button"
              className="mt-6 bg-green-500 text-white font-semibold rounded-lg px-6 py-3 hover:bg-green-600 transition duration-200"
            >
              Back
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Staff;
