import { useEffect, useState } from 'react';
import { Product } from '@/models/product';
import ProductItem from '@/components/product-item';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

function App() {
  const { cartItems } = useSelector((store: RootState) => store.cart);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const response = await fetch(
      'https://dummyjson.com/products?limit=9&skip=0'
    );
    const data = await response.json();
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold'>Products</h1>
      <div className='flex justify-between items-center'>
        <p>Items in cart: {cartItems.length}</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
