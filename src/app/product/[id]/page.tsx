'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import { Star, ShoppingCart } from 'lucide-react'

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1)

  const product = {
    id: 1,
    name: "Purple Headphones",
    price: 99.99,
    description: "Experience crystal-clear sound with our premium Purple Headphones. Featuring noise-cancellation technology and a comfortable over-ear design, these headphones are perfect for music lovers and professionals alike.",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.5,
    reviews: 128
  }

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
              <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
            <span className="ml-2 text-sm text-gray-600">({product.reviews} reviews)</span>
          </div>
          <p className="text-2xl font-bold mb-4 text-purple-700">${product.price.toFixed(2)}</p>
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
          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}