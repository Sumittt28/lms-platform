import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Dashboard from './pages/Dashboard';
import MyCourses from './pages/MyCourses';
import InstructorDashboard from './pages/InstructorDashboard';
import PaymentSuccess from './pages/PaymentSuccess';

function App() {
  return (
    <AuthProvider>
      <MainLayout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetails />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute>
                <MyCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/success"
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />

          {/* Instructor Routes */}
          <Route
            path="/instructor/dashboard"
            element={
              <ProtectedRoute requireRole="instructor">
                <InstructorDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MainLayout>
    </AuthProvider>
  );
}

export default App;
