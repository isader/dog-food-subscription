// Create a new file: src/components/Header.tsx

import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="primary" elevation={0} sx={{ mb: 4 }}>
      <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
        <Box 
          component="img"
          src="/lyka-logo.svg"
          alt="Lyka Dog Food"
          sx={{ height: 50 }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;