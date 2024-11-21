'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { Star, ShoppingCart } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { useParams } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useCart } from '@/app/cart/cart_provider';
import { toast } from 'react-hot-toast';  // Importar toast

const queryClient = new QueryClient();

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  rating?: number;
  reviews?: number;
}

export default function ProductDetailPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductDetail />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const productId = params.id ? parseInt(params.id as string, 10) : null;
  const { addToCart } = useCart();

  const { data: product, isLoading, isError, error } = useQuery<Product, Error>({
    queryKey: ['product', productId],
    queryFn: () => {
      if (productId) {
        return productService.getProductById(productId); 
      }
      throw new Error('No product ID provided');
    },
    enabled: !!productId,
  });

  if (isLoading) {
    return <div className="text-center text-xl mt-10">Cargando producto...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Error al cargar el producto:</p>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center text-gray-500 mt-10">Producto no encontrado</div>;
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        quantity: quantity,
        image: product.image
      });

      // Mostrar notificación de éxito con el nombre del producto y la cantidad añadida
      toast.success(`${product.name} - ${quantity} unidad(es) añadida(s) al carrito!`);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-auto"
        />
      </div>
      <Card>
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-purple-800">{product.name}</h1>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-5 w-5 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {product.reviews ? `(${product.reviews} reviews)` : '(No reviews)'}
            </span>
          </div>
          <p className="text-2xl font-bold mb-4 text-purple-700">${parseFloat(product.price).toFixed(2)}</p>
          <p className="mb-6 text-gray-700">{product.description}</p>
          <div className="flex items-center mb-6">
            <Button
              variant="outline"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1"
            >
              -
            </Button>
            <span className="mx-4 text-xl">{quantity}</span>
            <Button
              variant="outline"
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1"
            >
              +
            </Button>
          </div>
          <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Añadir al carrito
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
