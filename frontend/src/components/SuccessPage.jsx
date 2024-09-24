import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container } from '@mui/material';

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 3000);
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom>
            Payment Successful!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Thank you for your payment.
          </Typography>
          <Typography variant="body2" gutterBottom>
            You`ll now be redirected.
          </Typography>
    </Container>
  );
};

export default SuccessPage;