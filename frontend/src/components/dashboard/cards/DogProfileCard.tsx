import React from 'react';
import { Card, CardContent, Box, Avatar, Typography } from '@mui/material';
import { PetsRounded } from '@mui/icons-material';
import { Dog } from '../../../types';

type DogProfileCardProps = {
  dog: Dog;
};

const DogProfileCard: React.FC<DogProfileCardProps> = ({ dog }) => {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
            <PetsRounded />
          </Avatar>
          <Typography variant="h6">Dog Profile</Typography>
        </Box>
        
        <Box ml={1} mt={3}>
          <Typography variant="body1" gutterBottom><strong>Name:</strong> {dog.name}</Typography>
          <Typography variant="body1" gutterBottom><strong>Age:</strong> {dog.age} years</Typography>
          <Typography variant="body1" gutterBottom><strong>Weight:</strong> {dog.weight} kg</Typography>
        </Box>
        
      </CardContent>
    </Card>
  );
};

export default DogProfileCard;