import { BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-gray-900">EduPlatform</span>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} EduPlatform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
