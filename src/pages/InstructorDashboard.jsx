import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { PlusCircle, BookOpen, DollarSign, Layout } from 'lucide-react';

const InstructorDashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Get current user ID
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from('courses').insert([
      { 
        title, 
        description, 
        price: parseFloat(price), 
        instructor_id: user.id 
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert('Course created successfully!');
      setTitle('');
      setDescription('');
      setPrice('');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <Layout className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-blue-500" />
          Create New Course
        </h2>
        
        <form onSubmit={handleCreateCourse} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Master React in 30 Days"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="What will students learn?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (USD)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="number"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Publishing...' : 'Publish Course'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InstructorDashboard;