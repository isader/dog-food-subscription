import React from 'react';
import { Box, Typography, Chip, Button, Divider } from '@mui/material';

type StatusCardProps = {
  status: 'active' | 'paused' | 'cancelled';
  nextDeliveryDate: string;
  onPause: () => void;
  onResume: () => void;
  onCancel: () => void;
};

const StatusCard: React.FC<StatusCardProps> = ({
  status,
  nextDeliveryDate,
  onPause,
  onResume,
  onCancel
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'paused': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Subscription Status</Typography>
        <Chip 
          label={status.charAt(0).toUpperCase() + status.slice(1)} 
          color={getStatusColor(status) as any}
          sx={{ px: 1 }}
        />
      </Box>
      
      <Box mt={3} mb={2}>
        {status === 'active' ? (
          <Typography variant="body1">
            Your next delivery is scheduled for: <strong>{nextDeliveryDate}</strong>
          </Typography>
        ) : status === 'paused' ? (
          <Typography variant="body1">
            Your subscription is currently paused. Resume to continue receiving deliveries.
          </Typography>
        ) : (
          <Typography variant="body1">
            Your subscription has been cancelled.
          </Typography>
        )}
      </Box>
      
      <Box display="flex" gap={2} mb={4}>
        {status === 'active' ? (
          <Button 
            variant="outlined" 
            color="warning"
            onClick={onPause}
          >
            Pause Subscription
          </Button>
        ) : status === 'paused' ? (
          <Button 
            variant="contained" 
            color="primary"
            onClick={onResume}
          >
            Resume Subscription
          </Button>
        ) : null}
        
        {status !== 'cancelled' && (
          <Button 
            variant="outlined" 
            color="error"
            onClick={onCancel}
          >
            Cancel Subscription
          </Button>
        )}
      </Box>
      
      <Divider sx={{ my: 3 }} />
    </Box>
  );
};

export default StatusCard;