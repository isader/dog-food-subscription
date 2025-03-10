export type Dog = {
    id?: string;
    name: string;
    age: number;
    weight: number;
  };
  
  export type Subscription = {
    id?: string;
    pouchSize: number;
    pouchesPerMonth: number;
    price: number;
    status?: 'active' | 'paused' | 'cancelled';
    nextDeliveryDate?: string;
  };
  
  export type Customer = {
    id?: string;
    name: string;
    email: string;
    address: string;
  };
  
  export type Delivery = {
    id: string;
    deliveryDate: string;
    status: 'pending' | 'shipped' | 'delivered';
    trackingNumber: string;
    createdAt: string;
  };