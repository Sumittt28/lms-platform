import CourseCard from './CourseCard';
import { Loader } from '../common';

const CourseList = ({ courses, loading, error }) => {
  if (loading) {
    return (
      <div className="py-20">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No courses found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
