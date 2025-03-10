import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { dog, subscription, customer, isAuthenticated } = useAppContext();

  useEffect(() => {
    if (!isAuthenticated || !dog || !subscription || !customer) {
      navigate('/');
    }
  }, [navigate, isAuthenticated, dog, subscription, customer]);

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  if (!isAuthenticated || !dog || !subscription || !customer) {
    return null;
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: 'center' }}>
          <CheckCircleOutline sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
          
          <Typography variant="h4" component="h1" gutterBottom>
            Subscription Confirmed!
          </Typography>
          
          <Typography variant="body1" paragraph>
            Thank you, {customer.name}! Your subscription for {dog.name}'s monthly food box has been successfully processed.
          </Typography>
          
          <Typography variant="body1" paragraph>
            Your first delivery of {subscription.pouchesPerMonth} pouches ({subscription.pouchSize}g each) is on its way!
          </Typography>
          
          <Typography variant="body1" mb={4}>
            We've sent a confirmation email to {customer.email} with all the details.
          </Typography>
          
          <Button
            onClick={handleGoToDashboard}
            variant="contained"
            color="primary"
            size="large"
          >
            Go to My Dashboard
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default SuccessPage;