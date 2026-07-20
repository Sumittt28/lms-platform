import { useState, useEffect } from 'react';
import enrollmentService from '../services/enrollmentService';

export const useEnrollments = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      setLoading(true);
      const data = await enrollmentService.getMyCourses();
      setEnrolledCourses(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { enrolledCourses, loading, error, refetch: fetchEnrolledCourses };
};

export const useEnrollmentStatus = (courseId) => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) checkEnrollment();
  }, [courseId]);

  const checkEnrollment = async () => {
    try {
      const data = await enrollmentService.checkEnrollment(courseId);
      setIsEnrolled(data.isEnrolled);
    } catch (err) {
      setIsEnrolled(false);
    } finally {
      setLoading(false);
    }
  };

  return { isEnrolled, loading };
};

export default useEnrollments;
