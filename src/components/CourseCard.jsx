import { Link } from 'react-router-dom'; // Import added here
import { Book } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
      <div className="h-48 bg-blue-100 flex items-center justify-center">
        <Book className="h-16 w-16 text-blue-400" />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-xl text-gray-900 mb-2 truncate">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-blue-600">${course.price}</span>
          
          {/* Replace your old <button> with this <Link> */}
          <Link 
            to={`/course/${course.id}`} 
            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;