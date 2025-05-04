import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CommonDashboard from './pages/CommonDashboard';
import TaskView from './pages/TaskView';
import Notifications from './pages/Notifications';
import CreateTask from './pages/CreateTask';
import SubTask from './pages/SubTask';
import EditTask from './pages/EditTask';
import TransferTask from './pages/TransferTask';
import Calendar from './components/Calendar';
import LeaveManagement from './pages/LeaveManagement';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Home';
import ViewProfile from './pages/ViewProfile';
import EditProfile from './pages/EditProfile';
import FacultyTasks from './pages/FacultyTasks';
import StaffList from './pages/StaffList';
import LoginPage from './pages/LoginPage';

// A simple auth-check using localStorage token
// const isAuthenticated = () => {
//   return !!localStorage.getItem("authToken");
// };

// Protect routes
// function PrivateRoute({ children }) {
//   return isAuthenticated() ? children : <Navigate to="/login" replace />;
// }

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile/:id" element={<ViewProfile />} />
            <Route path="/profile/edit/:id" element={<EditProfile />} />
            <Route path="/staff" element={<StaffList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/common" element={<CommonDashboard />} />
            <Route path="/task/:id" element={<TaskView />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/faculty-tasks" element={<FacultyTasks />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/task/:id/subtasks" element={<SubTask />} />
            <Route path="/edit-task/:id" element={<EditTask />} />
            <Route path="/transfer-task/:id" element={<TransferTask />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/leave" element={<LeaveManagement />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
