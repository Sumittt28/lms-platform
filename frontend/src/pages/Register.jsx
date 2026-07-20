import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button, Input, Card } from '../components/common';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { register, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    navigate('/', { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await register(fullName, email, password, role);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-600 mt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Input
            type="text"
            placeholder="Full Name"
            icon={User}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <Input
            type="email"
            placeholder="Email address"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Password (min 6 characters)"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I want to
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === 'student'}
                  onChange={(e) => setRole(e.target.value)}
                  className="text-blue-600"
                />
                <span className="text-sm">Learn (Student)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="instructor"
                  checked={role === 'instructor'}
                  onChange={(e) => setRole(e.target.value)}
                  className="text-blue-600"
                />
                <span className="text-sm">Teach (Instructor)</span>
              </label>
            </div>
          </div>

          <Button type="submit" loading={loading} className="w-full">
            Create Account
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;
