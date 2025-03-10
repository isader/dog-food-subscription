import { createContext, useState, useContext, ReactNode } from 'react';

type Dog = {
  id?: string;
  name: string;
  age: number;
  weight: number;
};

type Subscription = {
  id?: string;
  pouchSize: number;
  pouchesPerMonth: number;
  price: number;
  status?: 'active' | 'paused' | 'cancelled';
  nextDeliveryDate?: string;
};

type Customer = {
  id?: string;
  name: string;
  email: string;
  address: string;
};

type AppContextType = {
  dog: Dog | null;
  setDog: React.Dispatch<React.SetStateAction<Dog | null>>;
  subscription: Subscription | null;
  setSubscription: React.Dispatch<React.SetStateAction<Subscription | null>>;
  customer: Customer | null;
  setCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dog, setDog] = useState<Dog | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AppContext.Provider
      value={{
        dog,
        setDog,
        subscription,
        setSubscription,
        customer,
        setCustomer,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};