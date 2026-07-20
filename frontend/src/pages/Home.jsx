import Hero from '../components/Hero';
import { useCourses } from '../hooks/useCourses';
import CourseList from '../components/course/CourseList';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const { courses, loading } = useCourses({ limit: 8 });

  return (
    <div>
      <Hero />
      
      {/* Featured Courses */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Courses</h2>
          <Link 
            to="/courses" 
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <CourseList courses={courses} loading={loading} />
      </div>
    </div>
  );
};

export default Home;
