import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, PlayCircle } from 'lucide-react';
import { useCourse } from '../hooks/useCourses';
import { Card, PageLoader } from '../components/common';
import VideoPlayer from '../components/video/VideoPlayer';
import VideoList from '../components/video/VideoList';
import CheckoutButton from '../components/payment/CheckoutButton';

const CourseDetails = () => {
  const { id } = useParams();
  const { course, loading, error } = useCourse(id);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    if (course?.videos?.length > 0) {
      // Select first preview video or first video if enrolled
      const firstVideo = course.videos.find(v => v.isPreview || course.isEnrolled) || course.videos[0];
      setSelectedVideo(firstVideo);
    }
  }, [course]);

  if (loading) return <PageLoader />;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!course) return <div className="text-center py-20">Course not found</div>;

  const totalDuration = course.videos?.reduce((acc, v) => acc + (v.durationSeconds || 0), 0) || 0;
  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/courses" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Courses
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          {selectedVideo && (
            <VideoPlayer
              vimeoVideoId={selectedVideo.vimeoVideoId}
              isLocked={selectedVideo.isLocked && !selectedVideo.isPreview}
            />
          )}

          {/* Course Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{course.title}</h1>
            <p className="text-gray-600 mb-4">{course.description}</p>
            
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>By {course.instructorName}</span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {course.enrollmentCount} students
              </span>
              {totalDuration > 0 && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`}
                </span>
              )}
            </div>
          </div>

          {/* Video List */}
          <Card className="p-4">
            <h2 className="font-semibold text-gray-900 mb-4">
              Course Content ({course.videos?.length || 0} lessons)
            </h2>
            {course.videos?.length > 0 ? (
              <VideoList
                videos={course.videos}
                currentVideoId={selectedVideo?.id}
                onSelectVideo={setSelectedVideo}
                isEnrolled={course.isEnrolled}
              />
            ) : (
              <div className="text-center py-8 text-gray-500">
                <PlayCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No lessons available yet</p>
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <div className="text-3xl font-bold text-gray-900 mb-4">
              ${course.price}
            </div>
            
            <CheckoutButton
              courseId={course.id}
              price={course.price}
              isEnrolled={course.isEnrolled}
            />

            <div className="mt-6 space-y-3 text-sm text-gray-600">
              <p>✓ Full lifetime access</p>
              <p>✓ Access on mobile and desktop</p>
              <p>✓ Certificate of completion</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
