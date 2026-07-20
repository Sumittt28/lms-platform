import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Video } from 'lucide-react';
import courseService from '../services/courseService';
import { Card, Button, Input, Modal, PageLoader } from '../components/common';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await courseService.getInstructorCourses();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title,
        description: course.description,
        price: course.price.toString()
      });
    } else {
      setEditingCourse(null);
      setFormData({ title: '', description: '', price: '' });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price)
      };

      if (editingCourse) {
        await courseService.updateCourse(editingCourse.id, data);
      } else {
        await courseService.createCourse(data);
      }

      setShowModal(false);
      fetchCourses();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      await courseService.deleteCourse(courseId);
      fetchCourses();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleTogglePublish = async (course) => {
    try {
      await courseService.updateCourse(course.id, {
        isPublished: !course.isPublished
      });
      fetchCourses();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="h-4 w-4" />
          Create Course
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {courses.length === 0 ? (
        <Card className="p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses yet</h3>
          <p className="text-gray-600 mb-4">Create your first course to get started.</p>
          <Button onClick={() => handleOpenModal()}>
            <Plus className="h-4 w-4" />
            Create Course
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <Card key={course.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {course.title}
                    </h3>
                    <span className={`
                      px-2 py-0.5 text-xs rounded-full
                      ${course.isPublished 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'}
                    `}>
                      {course.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>${course.price}</span>
                    <span>{course.enrollmentCount} students</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTogglePublish(course)}
                    className="p-2 text-gray-400 hover:text-blue-600"
                    title={course.isPublished ? 'Unpublish' : 'Publish'}
                  >
                    {course.isPublished ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={() => handleOpenModal(course)}
                    className="p-2 text-gray-400 hover:text-blue-600"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="p-2 text-gray-400 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingCourse ? 'Edit Course' : 'Create Course'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Course Title"
            placeholder="e.g., Master React in 30 Days"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="What will students learn?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <Input
            label="Price (USD)"
            type="number"
            min="0"
            step="0.01"
            placeholder="29.99"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" loading={submitting} className="flex-1">
              {editingCourse ? 'Save Changes' : 'Create Course'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default InstructorDashboard;
