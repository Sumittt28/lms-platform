import { Link } from 'react-router-dom';
import { PlayCircle, Users } from 'lucide-react';
import { Card } from '../common';

const CourseCard = ({ course }) => {
  return (
    <Link to={`/course/${course.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          {course.thumbnailUrl ? (
            <img 
              src={course.thumbnailUrl} 
              alt={course.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <PlayCircle className="h-16 w-16 text-white/80" />
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            {course.instructorName}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-blue-600">
              ${course.price}
            </span>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Users className="h-4 w-4" />
              <span>{course.enrollmentCount || 0}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CourseCard;
