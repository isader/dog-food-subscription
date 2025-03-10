import React from 'react';
import { Box, Typography } from '@mui/material';
import DeliveryTable from './DeliveryTable';
import { Delivery, Subscription } from '../../types';

type DeliveriesTabProps = {
  deliveries: Delivery[];
  subscription: Subscription;
  nextDeliveryDate: string;
  subscriptionStatus: 'active' | 'paused' | 'cancelled';
};

const DeliveriesTab: React.FC<DeliveriesTabProps> = ({
  deliveries,
  subscription,
  nextDeliveryDate,
  subscriptionStatus
}) => {
  return (
    <Box px={3}>
      <Typography variant="h6" gutterBottom>Delivery History</Typography>
      
      <DeliveryTable 
        deliveries={deliveries}
        subscription={subscription}
        nextDeliveryDate={nextDeliveryDate}
        subscriptionStatus={subscriptionStatus}
      />
    </Box>
  );
};

export default DeliveriesTab;