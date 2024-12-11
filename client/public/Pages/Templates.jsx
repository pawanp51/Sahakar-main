
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

const departments = {
  water: {
    title: "No Objection Certificate (NOC)",
    type: "Official Clearances, Approvals",
    description:
      "A No Objection Certificate is a legal document issued by an organization or entity to declare no objection to the details mentioned within the certificate.",
    letter: `[Government of India Letterhead/Organization Letterhead]
[Address of the issuing office]
[Date: DD/MM/YYYY]
Reference No: [Reference Number]

To Whom It May Concern,

Subject: No Objection Certificate

This is to certify that [Name of the Individual/Entity], residing at [Address], is/was associated with [Organization/Institution Name] as [Designation/Role] from [Start Date] to [End Date] (if applicable). During their association, their conduct and performance have been satisfactory.

We have no objection to [Name of the Individual/Entity] [reason for NOC, e.g., applying for higher studies, working with another organization, visiting abroad, etc.]. This certificate is issued at their request for the purpose of [specific purpose of NOC].

For any further clarification, please feel free to contact us at [Contact Information].

Yours sincerely,
[Your Name]
[Your Designation]
[Organization/Institution Name]

[Seal/Stamp of the Organization]`
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

  const formatTemplate = (template) => {
    let formatted = template;
    Object.keys(placeholderValues).forEach((key) => {
      formatted = formatted.replace(`[${key}]`, placeholderValues[key]);
    });
    return formatted;
  };

  const generatePDF = () => {
    if (selectedDepartment) {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text(selectedDepartment.title, 10, 20);
      doc.setFontSize(12);

      const letter = formatTemplate(selectedDepartment.letter);
      const lines = letter.split('\n');
      let y = 30;
      lines.forEach((line) => {
        doc.text(line, 10, y);
        y += 10;
      });

      doc.save(`${selectedDepartment.title}.pdf`);
    }
  };

  const generateDOCX = () => {
    if (selectedDepartment) {
      const formattedLetter = formatTemplate(selectedDepartment.letter);
      const paragraphs = formattedLetter.split('\n').map((line) =>
        new Paragraph({
          children: [new TextRun({ text: line, break: 1 })],
        })
      );

      const doc = new Document({
        sections: [
          {
            children: paragraphs,
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `${selectedDepartment.title}.docx`);
      });
    }
  };

  const handlePrint = () => {
    if (selectedDepartment) {
      const formattedLetter = formatTemplate(selectedDepartment.letter);
  
      const printWindow = window.open('', '_blank');
  
      printWindow.document.write(`
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                font-size: 12pt;
                margin: 1.5cm;
              }
              h1 {
                font-size: 16pt;
                text-align: center;
                margin-bottom: 20px;
              }
              h2, h3 {
                font-size: 14pt;
                margin-bottom: 10px;
              }
              .content {
                font-size: 12pt;
                line-height: 1.5;
                white-space: pre-wrap;
                word-wrap: break-word;
                margin-top: 20px;
              }
              .signature {
                margin-top: 40px;
                font-size: 12pt;
              }
              pre {
                white-space: pre-wrap;
                word-wrap: break-word;
              }
            </style>
          </head>
          <body>
            <h1>${selectedDepartment.title}</h1>
            <div class="content">
              <pre>${formattedLetter}</pre>
            </div>
            <div class="signature">
            </div>
          </body>
        </html>
      `);
  
      printWindow.document.close();
  
      printWindow.onload = () => {
        printWindow.print();
        printWindow.onafterprint = () => {
          printWindow.close();
        };
      };
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

            <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 text-sm font-mono mb-10 text-gray-800 whitespace-pre-wrap overflow-auto">
              {formatTemplate(selectedDepartment.letter)}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClose}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Back
              </button>
              <button
                onClick={handlePrint}
                className="bg-blue-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-600 transition"
              >
                Print
              </button>
              <button
                onClick={generatePDF}
                className="bg-green-700 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-800 transition"
              >
                Download PDF
              </button>
              <button
                onClick={generateDOCX}
                className="bg-blue-700 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-800 transition"
              >
                Download DOCX
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Templates;
              
