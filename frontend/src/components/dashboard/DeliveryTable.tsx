import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Chip, Button 
} from '@mui/material';
import { Delivery, Subscription } from '../../types';

type DeliveryTableProps = {
  deliveries: Delivery[];
  subscription: Subscription;
  nextDeliveryDate?: string;
  subscriptionStatus: 'active' | 'paused' | 'cancelled';
};

const DeliveryTable: React.FC<DeliveryTableProps> = ({ 
  deliveries, 
  subscription, 
  nextDeliveryDate,
  subscriptionStatus 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'info';
      case 'shipped': return 'primary';
      case 'delivered': return 'success';
      default: return 'default';
    }
  };

  return (
    <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Tracking</strong></TableCell>
            <TableCell><strong>Content</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deliveries.map((delivery) => (
            <TableRow key={delivery.id}>
              <TableCell>
                {new Date(delivery.deliveryDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Chip 
                  size="small"
                  label={delivery.status.charAt(0).toUpperCase() + delivery.status.slice(1)} 
                  color={getStatusColor(delivery.status) as any} 
                />
              </TableCell>
              <TableCell>
                <Button 
                  variant="text" 
                  size="small"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Tracking number: ${delivery.trackingNumber}`);
                  }}
                >
                  Track
                </Button>
              </TableCell>
              <TableCell>
                {subscription.pouchesPerMonth} pouches ({subscription.pouchSize}g)
              </TableCell>
            </TableRow>
          ))}
          
          {subscriptionStatus === 'active' && (
            <TableRow>
              <TableCell>
                {nextDeliveryDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Chip size="small" label="Scheduled" color="default" />
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>{subscription.pouchesPerMonth} pouches ({subscription.pouchSize}g)</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeliveryTable;