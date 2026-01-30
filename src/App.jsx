import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Signup from './pages/Signup';
import Login from './pages/Login';
import InstructorDashboard from './pages/InstructorDashboard';
import Courses from './pages/Courses';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* These were the ones causing the error! */}
        <Route path="/teach" element={<InstructorDashboard />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </div>
  );
}

export default App;