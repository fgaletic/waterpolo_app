import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Container } from "@mui/material";

const CancelPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 3000);
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Payment Cancelled
      </Typography>
      <Typography variant="body1" gutterBottom>
        You`ll now be redirected.
      </Typography>
    </Container>
  );
};

export default CancelPage;
