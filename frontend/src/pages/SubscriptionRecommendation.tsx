import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box, Paper, Grid, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppContext } from '../context/AppContext';

const SubscriptionRecommendation: React.FC = () => {
  const navigate = useNavigate();
  const { dog, setSubscription } = useAppContext();
  const [recommendation, setRecommendation] = useState({
    pouchSize: 0,
    pouchesPerMonth: 30,
    price: 0,
  });

  useEffect(() => {
    if (!dog) {
      navigate('/');
      return;
    }

    // Calculate pouch size based on dog weight
    const calculatedPouchSize = Math.max(50, Math.round(dog.weight * 10));
    const monthlyPrice = calculatePrice(calculatedPouchSize, 30);

    setRecommendation({
      pouchSize: calculatedPouchSize,
      pouchesPerMonth: 30,
      price: monthlyPrice,
    });
  }, [dog, navigate]);

  const calculatePrice = (pouchSize: number, count: number) => {
    // Base price calculation - adjust as needed
    const basePrice = 30;
    const sizeMultiplier = pouchSize / 100;
    // Use count in the calculation
    return Number((basePrice + (sizeMultiplier * 50) * (count / 30)).toFixed(2));
  };

  const handleSubscribe = () => {
    setSubscription(recommendation);
    navigate('/subscribe');
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!dog) return null;

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Your Recommended Subscription
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" component="h2">
              Monthly Box for {dog.name}
            </Typography>
            <Typography variant="h5" color="primary" fontWeight="bold">
              ${recommendation.price.toFixed(2)}/month
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" component="div">
                <Box mb={1}>
                  <strong>Dog Details:</strong>
                </Box>
                <Box mb={0.5}>• Name: {dog.name}</Box>
                <Box mb={0.5}>• Age: {dog.age} years</Box>
                <Box mb={2}>• Weight: {dog.weight} kg</Box>
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="body1" component="div">
                <Box mb={1}>
                  <strong>Subscription Details:</strong>
                </Box>
                <Box mb={0.5}>• {recommendation.pouchesPerMonth} daily pouches ({recommendation.pouchSize}g each)</Box>
                <Box mb={0.5}>• Fresh, personalized recipe</Box>
                <Box mb={0.5}>• Free delivery</Box>
                <Box mb={0.5}>• Cancel anytime</Box>
              </Typography>
            </Grid>
          </Grid>
          
          <Box mt={4} display="flex" justifyContent="space-between">
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              variant="outlined"
            >
              Back
            </Button>
            
            <Button
              onClick={handleSubscribe}
              variant="contained"
              color="primary"
              size="large"
            >
              Subscribe Now
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default SubscriptionRecommendation;