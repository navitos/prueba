'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from 'next/image'
import { Trash2 } from 'lucide-react'

const cartItems = [
  { id: 1, name: "goku ssj", price: 99.99, quantity: 1, image: "/images/products/gokussj.avif" },
  { id: 2, name: "naruto hokage", price: 69.99, quantity: 2, image: "/images/products/naruto.avif" },
]

export default function Cart() {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-purple-800">Your Shopping Cart</h1>
      {cartItems.map((item) => (
        <Card key={item.id} className="mb-4">
          <CardContent className="flex items-center p-4">
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="w-24 h-24 object-cover mr-4"
            />
            <div className="flex-grow">
              <h2 className="text-xl font-semibold mb-2 text-purple-700">{item.name}</h2>
              <p className="text-lg font-bold text-purple-600">${item.price.toFixed(2)}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <Button variant="destructive" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-2xl font-bold text-purple-700">${total.toFixed(2)}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-purple-600 hover:bg-purple-700"><a href="/checkout">Proceed to Checkout</a></Button>
        </CardFooter>
      </Card>
    </div>
  )
}