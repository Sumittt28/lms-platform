import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isInstructor, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16" />
      </nav>
    );
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">EduPlatform</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/courses" className="text-gray-600 hover:text-gray-900">
              Courses
            </Link>

            {user ? (
              <>
                {isInstructor && (
                  <Link to="/instructor/dashboard" className="text-gray-600 hover:text-gray-900">
                    Instructor Dashboard
                  </Link>
                )}
                <Link to="/my-courses" className="text-gray-600 hover:text-gray-900">
                  My Courses
                </Link>
                
                <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                  <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                    <User className="h-5 w-5" />
                    <span>{user.fullName}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="outline">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link 
              to="/courses" 
              className="block text-gray-600 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Courses
            </Link>

            {user ? (
              <>
                {isInstructor && (
                  <Link 
                    to="/instructor/dashboard" 
                    className="block text-gray-600 hover:text-gray-900"
                    onClick={() => setIsOpen(false)}
                  >
                    Instructor Dashboard
                  </Link>
                )}
                <Link 
                  to="/my-courses" 
                  className="block text-gray-600 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  My Courses
                </Link>
                <Link 
                  to="/dashboard" 
                  className="block text-gray-600 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2 pt-2">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">Log in</Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
