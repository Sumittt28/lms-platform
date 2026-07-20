import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import paymentService from '../services/paymentService';
import { Card, Button, PageLoader } from '../components/common';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      setStatus('error');
      return;
    }

    try {
      const result = await paymentService.verifyPayment(sessionId);
      if (result.success) {
        setStatus('success');
        setCourseId(result.courseId);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'loading') return <PageLoader />;

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <Card className="max-w-md w-full p-8 text-center">
        {status === 'success' ? (
          <>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              You have been enrolled in the course. Start learning now!
            </p>
            <div className="space-y-3">
              {courseId && (
                <Link to={`/course/${courseId}`}>
                  <Button className="w-full">Go to Course</Button>
                </Link>
              )}
              <Link to="/my-courses">
                <Button variant="secondary" className="w-full">
                  View My Courses
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Payment Failed
            </h1>
            <p className="text-gray-600 mb-6">
              Something went wrong with your payment. Please try again.
            </p>
            <Link to="/courses">
              <Button className="w-full">Browse Courses</Button>
            </Link>
          </>
        )}
      </Card>
    </div>
  );
};

export default PaymentSuccess;
