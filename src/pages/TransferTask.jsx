import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UploadButton from  '../components/UploadButton'

// Simulated list of staff members
const staffMembers = [
  { id: 1, name: 'Anjali Sharma', onLeave: false },
  { id: 2, name: 'Ravi Kumar', onLeave: true },
  { id: 3, name: 'Meena Singh', onLeave: false },
  { id: 4, name: 'Deepak Verma', onLeave: false }
];

// Simulated current task assignee (in a real app, this comes from backend)
const mockTask = {
  id: 1,
  title: 'Prepare Budget Proposal',
  currentAssignee: 'Anjali Sharma'
};

function TransferTask() {
  const { id } = useParams(); // task ID from route
  const navigate = useNavigate();

  const [newAssignee, setNewAssignee] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [file, setFile] = useState(null);


  const handleTransfer = () => {
    if (!newAssignee) {
      alert('Please select a staff member to transfer the task.');
      return;
    }

    const selectedStaff = staffMembers.find(s => s.name === newAssignee);
    if (selectedStaff?.onLeave) {
      alert('This staff member is currently on leave. Choose someone else.');
      return;
    }

    setConfirm(true);
  };

  const handleConfirm = () => {
    alert(`Task "${mockTask.title}" has been transferred to ${newAssignee}.`);
    // Normally you'd send a POST/PUT request here
    navigate('/');
  };

  return (
    <div className="p-6">
      <h1 className="title">Transfer Task</h1>

      <div className="card space-y-4">
        <p><strong>Task:</strong> {mockTask.title}</p>
        <p><strong>Current Assignee:</strong> {mockTask.currentAssignee}</p>

        <select
          className="w-full p-2 border rounded"
          value={newAssignee}
          onChange={e => setNewAssignee(e.target.value)}
        >
          <option value="">Select New Assignee</option>
          {staffMembers
            .filter(s => s.name !== mockTask.currentAssignee)
            .map(staff => (
              <option key={staff.id} value={staff.name}>
                {staff.name} {staff.onLeave ? '(On Leave)' : ''}
              </option>
            ))}
        </select>

        <UploadButton file={file} setFile={setFile} />


        <button className="button-orange hover:bg-orange-600" onClick={handleTransfer}>
          Transfer Task
        </button>

        {confirm && (
          <div className="p-4 bg-yellow-100 border border-yellow-300 rounded">
            <p>Are you sure you want to transfer this task to <strong>{newAssignee}</strong>?</p>
            <div className="flex gap-4 mt-3">
              <button className="button-orange" onClick={handleConfirm}>
                Yes, Confirm
              </button>
              <button
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                onClick={() => setConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransferTask;
