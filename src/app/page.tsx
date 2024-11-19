import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'

const products = [
  { id: 1, name: "Camiseta G", price: 99.99, image: "/images/products/camisag.webp" },
  { id: 2, name: "Sudadera N", price: 69.99, image: "/images/products/sudaderan.jpg" },
  { id: 3, name: "Chaqueta Vintage 1976", price: 999.99, image: "/images/products/vintage.webp" },
  { id: 4, name: "Camiseta 1990", price: 599.99, image: "/images/products/1990.jfif" },
  { id: 5, name: "Pantalones Cargo Negros", price: 129.99, image: "/images/products/cargo.webp" },
  { id: 6, name: "Gorra Anime Hunter X", price: 39.99, image: "/images/products/hxh.jpg" },
  { id: 7, name: "Vestido Floral Retro", price: 149.99, image: "/images/products/floral.jpg" },
  { id: 8, name: "Zapatos Deportivos 2024", price: 249.99, image: "/images/products/zapatos.webp" },
]

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-purple-800">Welcome to VIDE & CHIC</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardContent className="p-4">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold mb-2 text-purple-700">{product.name}</h2>
              <p className="text-lg font-bold text-purple-600">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="mt-auto">
              <Link href={`/product/${product.id}`} className="w-full">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">View Product</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}