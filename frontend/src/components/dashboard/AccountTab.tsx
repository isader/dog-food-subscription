import React from 'react';
import { Box, Typography } from '@mui/material';
import AccountInfoCard from './cards/AccountInfoCard';
import PaymentMethodCard from './cards/PaymentMethodCard';
import { Customer } from '../../types';

type AccountTabProps = {
  customer: Customer;
};

const AccountTab: React.FC<AccountTabProps> = ({ customer }) => {
  return (
    <Box px={3}>
      <Typography variant="h6" gutterBottom>Account Information</Typography>
      <AccountInfoCard customer={customer} />
      
      <Typography variant="h6" gutterBottom>Payment Method</Typography>
      <PaymentMethodCard />
    </Box>
  );
};

export default AccountTab;