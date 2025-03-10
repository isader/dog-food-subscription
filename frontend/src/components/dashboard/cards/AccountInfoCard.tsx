import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Customer } from '../../../types';

type AccountInfoCardProps = {
  customer: Customer;
};

const AccountInfoCard: React.FC<AccountInfoCardProps> = ({ customer }) => {
  return (
    <Card variant="outlined" sx={{ mb: 4 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Full Name</Typography>
            <Typography variant="body1">{customer.name}</Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Email Address</Typography>
            <Typography variant="body1">{customer.email}</Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">Delivery Address</Typography>
            <Typography variant="body1">{customer.address}</Typography>
          </Grid>
        </Grid>
        
      </CardContent>
    </Card>
  );
};

export default AccountInfoCard;