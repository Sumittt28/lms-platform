import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2, ArrowLeft, PlayCircle, Lock } from 'lucide-react';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(error);
        setFetchError('Could not load course. Please try again.');
      } else {
        setCourse(data);
      }
      setLoading(false);
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    setEnrolling(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      navigate('/login');
      return;
    }

    const { error } = await supabase.from('enrollments').insert([
      { user_id: user.id, course_id: id },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert('Enrolled successfully! Happy learning.');
    }
    setEnrolling(false);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
    </div>
  );

  if (fetchError) return <div className="text-center py-20 text-red-500">{fetchError}</div>;

  if (!course) return <div className="text-center py-20">Course not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link to="/courses" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8">
        <ArrowLeft size={20} /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Side: Info */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
          <p className="text-lg text-gray-600 mb-8">{course.description}</p>
          
          <h2 className="text-2xl font-bold mb-4">Course Content</h2>
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <span className="font-medium text-gray-700">Lessons will appear here once added by the instructor.</span>
            </div>
            <div className="p-6 text-center text-gray-400 text-sm">
              <PlayCircle className="mx-auto mb-2 text-gray-300" size={36} />
              No lessons available yet.
            </div>
          </div>
        </div>

        {/* Right Side: Sidebar Card */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-6 sticky top-24">
            <div className="h-48 bg-blue-50 rounded-xl mb-6 flex items-center justify-center">
               <PlayCircle size={64} className="text-blue-200" />
            </div>
            <div className="text-3xl font-bold mb-6">${course.price}</div>
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition mb-4 disabled:opacity-50"
            >
              {enrolling ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : 'Enroll Now'}
            </button>
            <p className="text-center text-sm text-gray-500">Full lifetime access</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;