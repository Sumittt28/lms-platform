import { useState, useEffect } from 'react';
import courseService from '../services/courseService';

export const useCourses = (params = {}) => {
  const [courses, setCourses] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, [JSON.stringify(params)]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getCourses(params);
      setCourses(data.courses);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { courses, pagination, loading, error, refetch: fetchCourses };
};

export const useCourse = (id) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const data = await courseService.getCourse(id);
      setCourse(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { course, loading, error, refetch: fetchCourse };
};

export default useCourses;
