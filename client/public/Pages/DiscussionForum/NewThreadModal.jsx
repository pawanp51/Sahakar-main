import React, { useState } from 'react';
import { X, PlusCircle, Globe, MessageCircle, Users } from 'lucide-react';

const NewThreadModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  const handleSubmit = () => {
    if (title.trim() && description.trim()) {
      onSubmit({
        title : title,
        content : description
      });
      // Reset form
      setTitle('');
      setDescription('');
      onClose();
    } else {
      // Basic validation
      alert('Please provide a thread title');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <PlusCircle className="mr-2 text-blue-500" /> 
            Create New Thread
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-gray-900"
          >
            <X />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-4">
          {/* Thread Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thread Title
            </label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter thread title"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Thread Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide content of your thread"
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Thread Type Selection
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Thread Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {threadTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setThreadType(type.id)}
                  className={`flex flex-col items-center p-3 rounded-lg border transition-all ${
                    threadType === type.id
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <type.icon className="mb-2" size={24} />
                  <span className="text-xs text-center">{type.name}</span>
                </button>
              ))}
            </div>
          </div> */}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t flex justify-end space-x-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Create Thread
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewThreadModal;