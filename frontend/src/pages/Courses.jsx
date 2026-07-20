import { useState } from 'react';
import { Search } from 'lucide-react';
import { useCourses } from '../hooks/useCourses';
import CourseList from '../components/course/CourseList';
import { Input } from '../components/common';

const Courses = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  
  const { courses, pagination, loading, error } = useCourses({ 
    search: search || undefined,
    page 
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Courses</h1>
        <div className="max-w-md">
          <Input
            type="text"
            placeholder="Search courses..."
            icon={Search}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      <CourseList courses={courses} loading={loading} error={error} />

      {pagination && pagination.totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`
                px-4 py-2 rounded-lg font-medium
                ${p === page 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
              `}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
