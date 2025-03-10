import React from 'react';
import { Box, Grid } from '@mui/material';
import StatusCard from './cards/StatusCard';
import DogProfileCard from './cards/DogProfileCard';
import SubscriptionDetailsCard from './cards/SubscriptionDetailsCard';
import { Dog, Subscription } from '../../types';

type SubscriptionTabProps = {
  dog: Dog;
  subscription: Subscription;
  subscriptionStatus: 'active' | 'paused' | 'cancelled';
  nextDeliveryDate: string;
  onPauseSubscription: () => void;
  onResumeSubscription: () => void;
  onCancelSubscription: () => void;
};

const SubscriptionTab: React.FC<SubscriptionTabProps> = ({
  dog,
  subscription,
  subscriptionStatus,
  nextDeliveryDate,
  onPauseSubscription,
  onResumeSubscription,
  onCancelSubscription
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box px={3}>
          <StatusCard 
            status={subscriptionStatus}
            nextDeliveryDate={nextDeliveryDate}
            onPause={onPauseSubscription}
            onResume={onResumeSubscription}
            onCancel={onCancelSubscription}
          />
        </Box>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Box mx={3}>
          <DogProfileCard dog={dog} />
        </Box>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Box mx={3}>
          <SubscriptionDetailsCard subscription={subscription} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SubscriptionTab;