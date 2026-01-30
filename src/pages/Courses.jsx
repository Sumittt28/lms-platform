import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import CourseCard from '../components/CourseCard';
import { Loader2, Search } from 'lucide-react';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching courses:', error);
    } else {
      setCourses(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Courses</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Learn from industry experts and take your skills to the next level.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">No courses found. Be the first to create one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;