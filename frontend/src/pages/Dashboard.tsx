import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { useAppContext } from '../context/AppContext';
import { getSubscription, updateSubscription, getDeliveries } from '../services/api';
import DashboardTabs from '../components/dashboard/DashboardTabs';
import { Delivery } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { dog, subscription, customer, isAuthenticated } = useAppContext();
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'active' | 'paused' | 'cancelled'>('active');
  const [nextDeliveryDate, setNextDeliveryDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("Dashboard loaded with state:", {
      isAuthenticated,
      hasSubscription: !!subscription?.id,
      hasDog: !!dog,
      hasCustomer: !!customer
    });
    if (!isAuthenticated || !subscription?.id) {
      console.log("Redirecting to homepage to due to missing data");
      navigate('/');
      return;
    }

    // Fetch subscription details
    const fetchSubscriptionData = async () => {
      setIsLoading(true);
      try {
        const subResponse = await getSubscription(subscription.id!);
        setSubscriptionStatus(subResponse.data.status);
        setNextDeliveryDate(subResponse.data.nextDeliveryDate);
        
        // Fetch deliveries
        const deliveriesResponse = await getDeliveries(subscription.id!);
        setDeliveries(deliveriesResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptionData();
  }, [navigate, isAuthenticated, subscription, dog, customer]);

  const handlePauseSubscription = async () => {
    try {
      await updateSubscription(subscription!.id!, { status: 'paused' });
      setSubscriptionStatus('paused');
      alert('Your subscription has been paused. You can resume it anytime.');
    } catch (error) {
      console.error('Error pausing subscription:', error);
    }
  };

  const handleResumeSubscription = async () => {
    try {
      await updateSubscription(subscription!.id!, { status: 'active' });
      setSubscriptionStatus('active');
      alert('Your subscription has been resumed!');
    } catch (error) {
      console.error('Error resuming subscription:', error);
    }
  };

  const handleCancelSubscription = async () => {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel your subscription? This action cannot be undone.'
    );
    
    if (confirmCancel) {
      try {
        await updateSubscription(subscription!.id!, { status: 'cancelled' });
        setSubscriptionStatus('cancelled');
        alert('Your subscription has been cancelled.');
      } catch (error) {
        console.error('Error cancelling subscription:', error);
      }
    }
  };

  if (!isAuthenticated || !dog || !subscription || !customer) {
    return null;
  }

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box my={4} textAlign="center">
          <Typography>Loading dashboard...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{width: '100%'}}>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          My Dashboard
        </Typography>
        
        <DashboardTabs
          dog={dog}
          subscription={subscription}
          customer={customer}
          deliveries={deliveries}
          subscriptionStatus={subscriptionStatus}
          nextDeliveryDate={nextDeliveryDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}
          onPauseSubscription={handlePauseSubscription}
          onResumeSubscription={handleResumeSubscription}
          onCancelSubscription={handleCancelSubscription}
        />
      </Box>
    </Container>
  );
};

export default Dashboard;