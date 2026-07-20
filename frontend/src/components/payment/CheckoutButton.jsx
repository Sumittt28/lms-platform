import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../common';
import { useAuth } from '../../hooks/useAuth';
import paymentService from '../../services/paymentService';

const CheckoutButton = ({ courseId, price, isEnrolled }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const { url } = await paymentService.createCheckout(courseId);
      window.location.href = url;
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isEnrolled) {
    return (
      <Button variant="secondary" className="w-full" disabled>
        Already Enrolled
      </Button>
    );
  }

  return (
    <Button
      onClick={handleCheckout}
      loading={loading}
      className="w-full"
      size="lg"
    >
      <ShoppingCart className="h-5 w-5" />
      Enroll for ${price}
    </Button>
  );
};

export default CheckoutButton;
