'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { useCart } from '@/app/cart/cart_provider';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);  

  const renderedCartItems = useMemo(() => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return <p className="text-center text-gray-500 my-6">Your cart is empty</p>;
    }

    console.log("Cart Items:", cartItems);

    return cartItems.map((item, index) => {
      const price = typeof item.price === 'number' ? item.price : 
                    typeof item.price === 'string' ? parseFloat(item.price) : 0;

      return (
        <Card key={`cart-item-${item.id || index}-${index}`} className="mb-4">
          <CardContent className="flex items-center p-4">
            {item.image ? (
              <Image
                src={item.image || '/placeholder-image.png'}
                alt={item.name || 'Product Image'}
                width={100}
                height={100}
                className="w-24 h-24 object-cover mr-4"
                onError={(e) => {
                  const imgElement = e.target as HTMLImageElement;
                  imgElement.src = '/placeholder-image.png';
                }}
              />
            ) : null}
            <div className="flex-grow">
              <h2 className="text-xl font-semibold mb-2 text-purple-700">
                {item.name || 'Unnamed Product'}
              </h2>
              <p className="text-lg font-bold text-purple-600">
                ${price.toFixed(2)}
              </p>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))} 
                  disabled={isUpdating || item.quantity <= 1}  // Deshabilitar durante la actualización
                >
                  -
                </Button>
                <span className="text-gray-600">{item.quantity}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} 
                  disabled={isUpdating}  // Deshabilitar durante la actualización
                >
                  +
                </Button>
              </div>
            </div>
            <Button 
              variant="destructive" 
              size="icon" 
              onClick={() => removeFromCart(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      );
    });
  }, [cartItems, isUpdating, updateQuantity, removeFromCart]);

  const handleUpdateQuantity = async (productId: number, quantity: number) => {
    setIsUpdating(true);  
    try {
      await updateQuantity(productId, quantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setIsUpdating(false);  
    }
  };

  const totalPrice = useMemo(() => {
    const total = cartItems.reduce((sum, item) => {
      const price = typeof item.price === 'number' ? item.price : 
                    typeof item.price === 'string' ? parseFloat(item.price) : 0;
      return sum + (price * item.quantity);
    }, 0);
    return total;
  }, [cartItems]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-purple-800">Your Shopping Cart</h1>
      {renderedCartItems}
      {cartItems.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">Total:</span>
              <span className="text-2xl font-bold text-purple-700">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700" 
              onClick={() => router.push('/checkout')}
            >
              Proceder al pago
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}