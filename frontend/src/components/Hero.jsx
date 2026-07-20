import { Link } from 'react-router-dom';
import { PlayCircle, Code, Globe, Zap, ArrowRight } from 'lucide-react';
import { Button } from './common';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Learn New Skills
              <span className="text-blue-600"> Online</span>
              <br />From Industry Experts
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Access thousands of courses taught by expert instructors. 
              Learn at your own pace and advance your career.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/courses">
                <Button size="lg">
                  Browse Courses
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg">
                  Start Teaching
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12">
              <div>
                <p className="text-3xl font-bold text-gray-900">10K+</p>
                <p className="text-sm text-gray-600">Students</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-600">Courses</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">100+</p>
                <p className="text-sm text-gray-600">Instructors</p>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <PlayCircle className="h-10 w-10 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Video Courses</h3>
              <p className="text-sm text-gray-600">Learn with high-quality video content</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Code className="h-10 w-10 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Hands-on Projects</h3>
              <p className="text-sm text-gray-600">Practice with real-world projects</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Globe className="h-10 w-10 text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Learn Anywhere</h3>
              <p className="text-sm text-gray-600">Access on any device, anytime</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Zap className="h-10 w-10 text-yellow-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Self-Paced</h3>
              <p className="text-sm text-gray-600">Learn at your own speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
