import { Link } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';
import { useEnrollments } from '../hooks/useEnrollments';
import { Card, PageLoader } from '../components/common';

const MyCourses = () => {
  const { enrolledCourses, loading, error } = useEnrollments();

  if (loading) return <PageLoader />;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Courses</h1>

      {enrolledCourses.length === 0 ? (
        <Card className="p-12 text-center">
          <PlayCircle className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses yet</h3>
          <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
          <Link 
            to="/courses"
            className="text-blue-600 hover:underline"
          >
            Browse courses →
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <Link key={course.id} to={`/course/${course.id}`}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  {course.thumbnailUrl ? (
                    <img 
                      src={course.thumbnailUrl} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <PlayCircle className="h-12 w-12 text-white/80" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {course.instructorName}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-blue-600">
                        {course.progress.percentage}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full transition-all"
                        style={{ width: `${course.progress.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      {course.progress.completedVideos} of {course.progress.totalVideos} lessons
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
