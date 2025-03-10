import React from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import { PetsRounded, LocalShippingOutlined, AccountCircleOutlined } from '@mui/icons-material';
import SubscriptionTab from './SubscriptionTab';
import DeliveriesTab from './DeliveriesTab';
import AccountTab from './AccountTab';
import { Dog, Subscription, Customer, Delivery } from '../../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3, minHeight: '500px', minWidth: '100%' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

type DashboardTabsProps = {
  dog: Dog;
  subscription: Subscription;
  customer: Customer;
  deliveries: Delivery[];
  subscriptionStatus: 'active' | 'paused' | 'cancelled';
  nextDeliveryDate: string;
  onPauseSubscription: () => void;
  onResumeSubscription: () => void;
  onCancelSubscription: () => void;
};

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  dog,
  subscription,
  customer,
  deliveries,
  subscriptionStatus,
  nextDeliveryDate,
  onPauseSubscription,
  onResumeSubscription,
  onCancelSubscription
}) => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Paper elevation={3} sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="dashboard tabs"
          centered
        >
          <Tab icon={<PetsRounded />} label="Subscription" />
          <Tab icon={<LocalShippingOutlined />} label="Deliveries" />
          <Tab icon={<AccountCircleOutlined />} label="Account" />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <SubscriptionTab 
          dog={dog}
          subscription={subscription}
          subscriptionStatus={subscriptionStatus}
          nextDeliveryDate={nextDeliveryDate}
          onPauseSubscription={onPauseSubscription}
          onResumeSubscription={onResumeSubscription}
          onCancelSubscription={onCancelSubscription}
        />
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <DeliveriesTab 
          deliveries={deliveries}
          subscription={subscription}
          nextDeliveryDate={nextDeliveryDate}
          subscriptionStatus={subscriptionStatus}
        />
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        <AccountTab customer={customer} />
      </TabPanel>
    </Paper>
  );
};

export default DashboardTabs;