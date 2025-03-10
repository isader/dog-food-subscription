import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProvider } from './context/AppContext';

// Import theme
import { theme } from './themes/main';

// Import pages
import DogProfileForm from './pages/DogProfileForm';
import SubscriptionRecommendation from './pages/SubscriptionRecommendation';
import SubscriptionForm from './pages/SubscriptionForm';
import Dashboard from './pages/Dashboard';
import SuccessPage from './pages/SuccessPage';
import Header from './components/Header';

// In App.tsx



function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<DogProfileForm />} />
            <Route path="/recommendation" element={<SubscriptionRecommendation />} />
            <Route path="/subscribe" element={<SubscriptionForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;