import React, { useState } from 'react';
import jsPDF from 'jspdf';

const departments = {
  water: {
    title: "Office Memorandum",
    type: "Reports, Letters, Maintenance Schedules, Compliance Documents",
    description:
      "An office memorandum is an internal document written to inform employees of policy, procedures, announcements, or instructions.",
    letter: `[Government of India Letterhead/Department Letterhead]
[Address of the issuing office]
[Date: DD/MM/YYYY]
Office Order No: [Order Number, if applicable]

To,
[Recipient Name]
[Recipient’s Designation]
[Recipient's Department/Office]
[Address]

Subject: Internal Office Policy Update

Dear [Recipient],

This memorandum serves as a notification regarding [Policy/Procedure]. Please be advised that the following changes will take effect immediately.

First, [Change 1]. Second, [Change 2]. Finally, [Change 3]. We request all concerned individuals to take note of these changes and act accordingly.

For any further clarification, please contact [Department Name]. We appreciate your prompt compliance with these changes.

Yours sincerely,
[Your Name]
[Your Designation]
[Department Name/Ministry Name]`
  },
  fire: {
    title: "Office Order",
    type: "Incident Reports, Emergency Response Guidelines, Safety Regulations",
    description: "An office order is used for issuing specific instructions or assignments to individuals or departments.",
    letter: `[Government of India Letterhead/Department Letterhead]
[Address of the issuing office]
[Date: DD/MM/YYYY]
Office Order No: [Order Number, if applicable]

To,
[Recipient Name]
[Recipient’s Designation]
[Recipient's Department/Office]
[Address]

Subject: [Subject of the Office Order]

Dear [Recipient],

The following orders are issued with immediate effect:

1. [Order Details]
2. [Order Details]

All concerned are directed to comply with the above instructions without delay. Please ensure that these orders are followed meticulously to maintain the safety and integrity of operations.

Thank you for your cooperation in this matter.

Yours sincerely,
[Your Name]
[Your Designation]
[Department Name/Ministry Name]`
  },
  earth: {
    title: "Demand for Grant",
    type: "Budget Requests, Financial Allocation",
    description: "A demand for grant is a formal request for the allocation of government funds for specific purposes.",
    letter: `[Government of India Letterhead/Department Letterhead]
[Address of the issuing office]
[Date: DD/MM/YYYY]
Office Order No: [Order Number, if applicable]

To,
The Financial Secretary,
[Government Department]
[Address]

Subject: Demand for Grant for [Purpose]

Dear Sir/Madam,

In accordance with the financial rules, I am requesting a grant of [Amount] for the purpose of [Purpose]. The details of the required funds are outlined as follows:

1. [Itemized Cost 1]
2. [Itemized Cost 2]

It is kindly requested that this application be given priority consideration so that we can ensure timely execution of the intended project. Your support in this matter is greatly appreciated.

Yours sincerely,
[Your Name]
[Your Designation]
[Department Name/Ministry Name]`
  },
  air: {
    title: "Notice",
    type: "Public Announcements, Circulars, Alerts",
    description: "A notice is used for informing the public or specific departments about important updates or actions.",
    letter: `[Government of India Letterhead/Department Letterhead]
[Address of the issuing office]
[Date: DD/MM/YYYY]
Office Order No: [Order Number, if applicable]

To,
[Recipient Name]
[Recipient’s Designation]
[Recipient's Department/Office]
[Address]

Subject: [Subject of the Notice]

Dear [Recipient],

This is to inform all concerned that [Notice Details]. The following actions are required to be completed by [Deadline]:

1. [Action Item 1]
2. [Action Item 2]

For further information or clarification, please contact [Contact Information]. We appreciate your prompt attention to this matter.

Yours sincerely,
[Your Name]
[Your Designation]
[Department Name/Ministry Name]`
  },
  forest: {
    title: "Circular",
    type: "Internal Communication, Policy Updates",
    description: "A circular is an internal communication document used to disseminate information within an organization.",
    letter: `[Government of India Letterhead/Department Letterhead]
[Address of the issuing office]
[Date: DD/MM/YYYY]
Office Order No: [Order Number, if applicable]

To,
[Recipient Name]
[Recipient’s Designation]
[Recipient's Department/Office]
[Address]

Subject: [Subject of the Circular]

Dear [Recipient],

It is hereby informed that [Details of the Information]. The relevant guidelines and instructions are as follows:

1. [Instruction 1]
2. [Instruction 2]

Please ensure compliance with the above guidelines. If you have any questions, feel free to reach out for clarification. Your adherence to these instructions is crucial for smooth operations.

Yours sincerely,
[Your Name]
[Your Designation]
[Department Name/Ministry Name]`
  },
  health: {
    title: "Notification",
    type: "Government Orders, Official Announcements",
    description: "A notification is a formal announcement issued by a government body regarding rules, regulations, or decisions.",
    letter: `[Government of India Letterhead/Department Letterhead]
[Address of the issuing office]
[Date: DD/MM/YYYY]
Office Order No: [Order Number, if applicable]

To,
[Recipient Name]
[Recipient’s Designation]
[Recipient's Department/Office]
[Address]

Subject: [Subject of the Notification]

Dear [Recipient],

In exercise of the powers conferred under [Relevant Law], the government hereby notifies the following:

1. [Notification Detail 1]
2. [Notification Detail 2]

This notification takes effect from [Date]. Please ensure that the information provided is disseminated and followed accordingly. We appreciate your cooperation in adhering to these regulations.

Yours sincerely,
[Your Name]
[Your Designation]
[Department Name/Ministry Name]`
  }
};

const Templates = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [placeholderValues, setPlaceholderValues] = useState({});

  const handleClose = () => {
    setSelectedDepartment(null);
    setPlaceholderValues({});
  };

  const handleOpen = (department) => {
    setSelectedDepartment(department);
    setPlaceholderValues({});
  };

  const handleInputChange = (placeholder, value) => {
    setPlaceholderValues((prevValues) => ({
      ...prevValues,
      [placeholder]: value,
    }));
  };

  const generatePDF = () => {
    if (selectedDepartment) {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text(selectedDepartment.title, 10, 20);
      doc.setFontSize(12);
      let letter = selectedDepartment.letter;

      Object.keys(placeholderValues).forEach((key) => {
        letter = letter.replace(`[${key}]`, placeholderValues[key]);
      });

      const lines = letter.split('\n');
      let y = 30;
      lines.forEach((line) => {
        doc.text(line, 10, y);
        y += 10;
      });

      doc.save(`${selectedDepartment.title}.pdf`);
    }
  };

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen p-6">
      <div className="max-w-screen-lg mx-auto py-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-10 text-center">Government Departments</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(departments).map(([key, dept]) => (
            <div
              key={key}
              className="bg-white border border-blue-200 rounded-xl shadow-lg p-6 transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
              onClick={() => handleOpen(dept)}
            >
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{dept.title}</h2>
              <p className="text-gray-600 mb-4">{dept.type}</p>
              <p className="text-gray-700 mb-6">{dept.description}</p>
              <button
                className="bg-blue-700 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-800 transition"
              >
                Explore
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedDepartment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleClose}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-10/12 sm:w-2/3 lg:w-1/2 p-8 relative max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
              aria-label="Close popup"
            >
              &times;
            </button>
            <h2 className="text-3xl font-semibold text-blue-800 mb-4">{selectedDepartment.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{selectedDepartment.type}</p>
            <p className="text-gray-800 mb-6">{selectedDepartment.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {selectedDepartment.letter.match(/\[(.*?)\]/g)?.map((placeholder, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium">
                    {placeholder.replace(/[\[\]]/g, '')}:
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => handleInputChange(placeholder.replace(/[\[\]]/g, ''), e.target.value)}
                  />
                </div>
              ))}
            </div>

            <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 text-sm font-mono mb-10 text-gray-800 h-[30vh] w-[100vh] overflow-auto">
              {Object.keys(placeholderValues).length > 0
                ? Object.keys(placeholderValues).reduce(
                    (acc, key) => acc.replace(`[${key}]`, placeholderValues[key]),
                    selectedDepartment.letter
                  )
                : selectedDepartment.letter.split('\n').map((line, index) => (
                    <p key={index} className="mb-2">
                      {line}
                    </p>
                  ))}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClose}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Back
              </button>
              <button
                onClick={generatePDF}
                className="bg-green-700 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-800 transition"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Templates;
