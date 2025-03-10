import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { useAppContext } from '../context/AppContext';

type DogFormData = {
  name: string;
  age: number;
  weight: number;
};

const DogProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const { setDog } = useAppContext();
  const { control, handleSubmit, formState: { errors } } = useForm<DogFormData>();

  const onSubmit = (data: DogFormData) => {
    setDog(data);
    navigate('/recommendation');
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Tell us about your dog
        </Typography>
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Dog's Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            
            <Controller
              name="age"
              control={control}
              defaultValue={0}
              rules={{ 
                required: 'Age is required',
                min: { value: 0.1, message: 'Age must be at least 0.1 years' },
                max: { value: 20, message: 'Age must be less than 20 years' }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Dog's Age (years)"
                  type="number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  inputProps={{ step: 0.1 }}
                  error={!!errors.age}
                  helperText={errors.age?.message}
                />
              )}
            />
            
            <Controller
              name="weight"
              control={control}
              defaultValue={0}
              rules={{ 
                required: 'Weight is required',
                min: { value: 0.5, message: 'Weight must be at least 0.5 kg' },
                max: { value: 100, message: 'Weight must be less than 100 kg' }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Dog's Weight (kg)"
                  type="number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  inputProps={{ step: 0.1 }}
                  error={!!errors.weight}
                  helperText={errors.weight?.message}
                />
              )}
            />
            
            <Box mt={3} display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Next
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default DogProfileForm;