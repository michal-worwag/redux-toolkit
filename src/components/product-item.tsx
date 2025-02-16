import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { addToCart } from '@/features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Product } from '@/models/product';

type PartialProduct = Pick<Product, 'id' | 'title' | 'thumbnail' | 'price'>;

export default function ProductItem({ product }: { product: PartialProduct }) {
  const { cartItems } = useSelector((store: RootState) => store.cart);
  const dispatch = useDispatch();

  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Card className='overflow-hidden flex flex-col justify-between'>
      <CardContent className='p-0 '>
        <img
          src={product.thumbnail}
          alt={product.title}
          loading='lazy'
          className='w-full h-48 object-cover bg-gray-100'
        />
        <div className='p-4'>
          <h3 className='text-lg font-semibold mb-2'>{product.title}</h3>
          <p className='text-gray-600'>${product.price.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter className='p-4'>
        <Button
          variant={isInCart ? 'default' : 'outline'}
          className='w-full'
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? 'In Cart' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}
