import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box, Paper, Grid, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppContext } from '../context/AppContext';
import { createUser, createDog, createSubscription, processPayment } from '../services/api';

type FormData = {
  name: string;
  email: string;
  address: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

const SubscriptionForm: React.FC = () => {
  const navigate = useNavigate();
  const { dog, subscription, setCustomer, setSubscription, setIsAuthenticated } = useAppContext();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  if (!dog || !subscription) {
    navigate('/');
    return null;
  }

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Starting subscription process...');
      
      // Create User profile
      const userData = {
        name: data.name,
        email: data.email,
        address: data.address,
      }

      //console.log('Creating dog with data:', userData);
      const userResponse = await createUser(userData);
      
      console.log('User created successfully:', userResponse.data);
      const userId = userResponse.data.id;
      
      // Create Dog profile
      const dogData = {
        name: dog.name,
        age: Number(dog.age),
        weight: Number(dog.weight),
        userId: userId
      };
      
      // console.log('Creating dog with data:', dogData);
      const dogResponse = await createDog(dogData);

      console.log('Dog created successfully:', dogResponse.data);
      const dogId = dogResponse.data.id;
      
      // Create subscription data
      const subscriptionData = {
        ...subscription,
        userId,
        dogId,
        status: 'active',
        nextDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        pouchSize: Number(subscription.pouchSize),
        pouchesPerMonth: Number(subscription.pouchesPerMonth),
        price: Number(subscription.price)
      };
      
      //console.log('Creating subscription with data:', subscriptionData);      
      const subscriptionResponse = await createSubscription(subscriptionData);
      
      console.log('Subscription created successfully:', subscriptionResponse.data);
      
      // Payment processing
      await processPayment({
        subscriptionId: subscriptionResponse.data.id,
        amount: subscription.price,
        cardNumber: data.cardNumber,
        expiryDate: data.expiryDate,
        cvv: data.cvv,
      });
      
      // Update app state
      setCustomer({
        id: userId,
        name: data.name,
        email: data.email,
        address: data.address,
      });

      setSubscription(subscriptionResponse.data);
      
      setIsAuthenticated(true);
      
      // Navigate to success page
      navigate('/success');
    } catch (error) {
      console.error('Error creating subscription:', error);
      alert('There was an error processing your subscription. Please try again.');
    }
  };

  const handleBack = () => {
    navigate('/recommendation');
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Complete Your Subscription
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Typography variant="h6" component="h2" gutterBottom>
                Order Summary
              </Typography>
              
              <Box mb={2}>
                <Typography variant="body1" component="div">
                  <Box mb={0.5}><strong>Dog:</strong> {dog.name}</Box>
                  <Box mb={0.5}><strong>Box Contents:</strong> {subscription.pouchesPerMonth} pouches ({subscription.pouchSize}g)</Box>
                  <Box mb={0.5}><strong>Monthly Price:</strong> ${subscription.price.toFixed(2)}</Box>
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="body2" color="text.secondary">
                By completing this subscription, you agree to our Terms of Service and Privacy Policy.
                You can cancel or pause your subscription at any time.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={7}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h6" component="h2" gutterBottom>
                  Your Details
                </Typography>
                
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Full Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
                
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{ 
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email address'
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email Address"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
                
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Address is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Delivery Address"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                      rows={2}
                      error={!!errors.address}
                      helperText={errors.address?.message}
                    />
                  )}
                />
                
                <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3 }}>
                  Payment Details
                </Typography>
                
                <Controller
                  name="cardNumber"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Card number is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Card Number"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      placeholder="4242 4242 4242 4242"
                      error={!!errors.cardNumber}
                      helperText={errors.cardNumber?.message}
                    />
                  )}
                />
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Controller
                      name="expiryDate"
                      control={control}
                      defaultValue=""
                      rules={{ required: 'Expiry date is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Expiry Date (MM/YY)"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          placeholder="MM/YY"
                          error={!!errors.expiryDate}
                          helperText={errors.expiryDate?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="cvv"
                      control={control}
                      defaultValue=""
                      rules={{ required: 'CVV is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="CVV"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          type="password"
                          error={!!errors.cvv}
                          helperText={errors.cvv?.message}
                        />
                      )}
                    />
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
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Complete Subscription
                  </Button>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default SubscriptionForm;