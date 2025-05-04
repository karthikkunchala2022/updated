import { useState } from 'react';

function TaskView() {
  const [selectedImage, setSelectedImage] = useState(null); // State for image preview

  const taskDetail = {
    title: 'Update Website',
    description: 'Add latest research papers to the faculty profile page.',
    deadline: 'May 10, 2025',
    status: 'In Progress',
    assignedTo: 'AS',
    priority: 'Medium',
    attachments: [
      'data:image/png;base64,...', // Example image attachment
      'data:application/pdf;base64,...' // Example file attachment
    ]
  };

  return (
    <div className="p-6">
      <h1 className="title">Task Details</h1>
      <div className="card">
        <p><strong>Title:</strong> {taskDetail.title}</p>
        <p><strong>Description:</strong> {taskDetail.description}</p>
        <p><strong>Deadline:</strong> {taskDetail.deadline}</p>
        <p><strong>Status:</strong> {taskDetail.status}</p>
        <p><strong>Assigned to:</strong> {taskDetail.assignedTo}</p>
        <p><strong>Priority:</strong> {taskDetail.priority}</p>

        {/* Attachments */}
        {taskDetail.attachments && taskDetail.attachments.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Attachments</h2>
            <div className="flex flex-wrap gap-2">
              {taskDetail.attachments.map((url, idx) => (
                <div key={idx} className="relative inline-block">
                  {url.startsWith('data:image') ? (
                    <img
                      src={url}
                      alt={`attachment-${idx}`}
                      className="max-w-xs max-h-48 rounded border cursor-pointer"
                      onClick={() => setSelectedImage(url)}
                    />
                  ) : (
                    <a
                      href={url}
                      download
                      className="text-blue-600 underline"
                    >
                      Download file {idx + 1}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Image Preview Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative">
              <img
                src={selectedImage}
                alt="Preview"
                className="max-w-full max-h-screen rounded"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 text-white text-2xl font-bold"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <button className="button-orange mt-4">Transfer Task</button>
      </div>
    </div>
  );
}

export default TaskView;