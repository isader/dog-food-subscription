import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';

const PaymentMethodCard: React.FC = () => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body1">•••• •••• •••• 4242</Typography>
            <Typography variant="body2" color="text.secondary">Expires 12/25</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodCard;