import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from '@/features/cart/cartSlice';
import { RootState, AppDispatch } from '@/store';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const { asyncCartItems, status, error } = useSelector(
    (state: RootState) => state.cart
  );
  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading cart items...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading cart: {error}</div>;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
      {asyncCartItems.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>${item.price}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
