import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Settings, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useEnrollments } from '../hooks/useEnrollments';
import { Card, PageLoader } from '../components/common';

const Dashboard = () => {
  const { user, isInstructor } = useAuth();
  const { enrolledCourses, loading } = useEnrollments();

  if (loading) return <PageLoader />;

  const inProgressCourses = enrolledCourses.filter(c => c.progress.percentage < 100);
  const completedCourses = enrolledCourses.filter(c => c.progress.percentage === 100);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Welcome Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.fullName}!
        </h1>
        <p className="text-gray-600 mt-1">
          {isInstructor ? "Instructor Account" : "Student Account"}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
              <p className="text-sm text-gray-600">Enrolled Courses</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <GraduationCap className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{inProgressCourses.length}</p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <GraduationCap className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedCourses.length}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/my-courses">
          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">My Courses</h3>
                <p className="text-sm text-gray-600">Continue learning</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/courses">
          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <GraduationCap className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Browse Courses</h3>
                <p className="text-sm text-gray-600">Discover new courses</p>
              </div>
            </div>
          </Card>
        </Link>

        {isInstructor && (
          <Link to="/instructor/dashboard">
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <Settings className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Instructor Dashboard</h3>
                  <p className="text-sm text-gray-600">Manage your courses</p>
                </div>
              </div>
            </Card>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
