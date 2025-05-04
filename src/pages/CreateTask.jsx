import { useState } from 'react';
import UploadButton from '../components/UploadButton'; // Import the UploadButton component

const staffMembers = [
  { id: 1, name: 'Anjali Sharma', onLeave: false },
  { id: 2, name: 'Ravi Kumar', onLeave: true },
  { id: 3, name: 'Meena Singh', onLeave: false }
];

const priorities = ['High', 'Medium', 'Low'];

function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [unassigned, setUnassigned] = useState(false);
  const [attachments, setAttachments] = useState([]); // State for attachments

  const handleSubmit = () => {
    if (!title || !deadline || (!assignee && !unassigned)) {
      alert('Please fill in all required fields before submitting the task.');
      return;
    }

    const selectedStaff = staffMembers.find(s => s.name === assignee);
    if (selectedStaff?.onLeave) {
      alert('Staff member is currently on leave. Consider assigning to another staff member.');
      return;
    }

    alert(`Task "${title}" created successfully with ${attachments.length} attachment(s).`);
    // You can add POST API request here, including the attachments.
  };

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
      {/* Background Circles */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-orange-600 rounded-full z-0 pointer-events-none" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-orange-600 rounded-full z-0 pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 animate-fade-in-up">
          <h1 className="text-2xl font-bold text-center text-orange-500 mb-6">Create New Task</h1>

          <div className="space-y-4">

            {/* Title */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Title *</label>
              <input
                type="text"
                placeholder="Task title"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Description</label>
              <textarea
                placeholder="Task description"
                className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Deadline *</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
              />
            </div>

            {/* Assignee */}
            {!unassigned && (
              <div>
                <label className="block mb-1 font-medium text-gray-700">Assign To *</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={assignee}
                  onChange={e => setAssignee(e.target.value)}
                >
                  <option value="">Select Staff Member</option>
                  {staffMembers.map(staff => (
                    <option key={staff.id} value={staff.name}>
                      {staff.name} {staff.onLeave ? '(On Leave)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Unassigned Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={unassigned}
                onChange={e => {
                  setUnassigned(e.target.checked);
                  if (e.target.checked) setAssignee('');
                }}
                className="mr-2"
              />
              <label className="text-gray-700">Mark as Unassigned Task</label>
            </div>

            {/* Priority */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Priority</label>
              <select
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={priority}
                onChange={e => setPriority(e.target.value)}
              >
                {priorities.map(level => (
                  <option key={level} value={level}>{level} Priority</option>
                ))}
              </select>
            </div>

            {/* Attachments */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Attachments</label>
              <UploadButton files={attachments} setFiles={setAttachments} multiple />
              {attachments.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {attachments.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm"
                    >
                      <span className="truncate max-w-xs">{file.name}</span>
                      <button
                        className="ml-2 text-gray-500 hover:text-gray-700"
                        onClick={() =>
                          setAttachments(prev => prev.filter((_, i) => i !== idx))
                        }
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
