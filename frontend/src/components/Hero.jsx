import { Link } from 'react-router-dom';
import { PlayCircle, Code, Globe, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-white pb-16 pt-10 lg:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* Left Text Content */}
          <div className="lg:col-span-6 lg:text-left text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Master Coding</span>
              <span className="block text-blue-600">Build Real Projects</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
              Learn full-stack development by building real-world applications. 
              From React to Supabase, we cover the stack that gets you hired.
            </p>
            <div className="mt-8 sm:mt-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                 <Link
                  to="/courses"
                  className="flex items-center justify-center rounded-lg border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 md:text-lg md:px-10"
                >
                  Explore Courses
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center justify-center rounded-lg border border-transparent bg-blue-100 px-8 py-3 text-base font-medium text-blue-700 hover:bg-blue-200 md:text-lg md:px-10"
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Start Learning
                </Link>
              </div>
            </div>
          </div>

          {/* Right Feature Grid (Visual) */}
          <div className="mt-12 lg:mt-0 lg:col-span-6">
             <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                    <Code className="h-10 w-10 text-blue-500 mb-4" />
                    <h3 className="font-semibold text-gray-900">Hands-on Code</h3>
                    <p className="text-center text-sm text-gray-500 mt-2">Build actual projects, not just theory.</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                    <Globe className="h-10 w-10 text-green-500 mb-4" />
                    <h3 className="font-semibold text-gray-900">Modern Stack</h3>
                    <p className="text-center text-sm text-gray-500 mt-2">React, Node, Supabase & more.</p>
                  </div>
                   <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm sm:col-span-2">
                    <Zap className="h-10 w-10 text-yellow-500 mb-4" />
                    <h3 className="font-semibold text-gray-900">Fast Progression</h3>
                    <p className="text-center text-sm text-gray-500 mt-2">Zero to Hero paths designed for students.</p>
                  </div>
                </div>
             </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Hero;