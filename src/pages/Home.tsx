import { useState } from 'react';
import { SearchPanel } from '../components/SearchPanel';
import { OrderList } from '../components/OrderList';
import { ChatAssistant } from '../components/ChatAssistant';
import { getOrdersByCustomerId } from '../services/orderService';

export const Home = () => {
  const [orders, setOrders] = useState([]);

  const handleSearch = async (customerId: string) => {
    const res = await getOrdersByCustomerId(customerId);
    setOrders(res);
  };

  return (
    <>
      <SearchPanel onSearch={handleSearch} />
      <OrderList orders={orders} />
      <ChatAssistant />
    </>
  );
};