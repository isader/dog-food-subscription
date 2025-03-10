import React from 'react';
import { Card, CardContent, Box, Avatar, Typography } from '@mui/material';
import { LocalShippingOutlined } from '@mui/icons-material';
import { Subscription } from '../../../types';

type SubscriptionDetailsCardProps = {
  subscription: Subscription;
};

const SubscriptionDetailsCard: React.FC<SubscriptionDetailsCardProps> = ({ subscription }) => {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
            <LocalShippingOutlined />
          </Avatar>
          <Typography variant="h6">Box Details</Typography>
        </Box>
        
        <Box ml={1} mt={3}>
          <Typography variant="body1" gutterBottom>
            <strong>Plan:</strong> Monthly Subscription
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Pouches:</strong> {subscription.pouchesPerMonth} pouches ({subscription.pouchSize}g each)
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Price:</strong> ${subscription.price.toFixed(2)}/month
          </Typography>
        </Box>
        
      </CardContent>
    </Card>
  );
};

export default SubscriptionDetailsCard;