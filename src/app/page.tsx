import Layout from './layout'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'

const products = [
  { id: 1, name: "Goku ssj", price: 99.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Naruto sasuke", price: 199.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Camara canon 1976", price: 999.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Tio rico 1990", price: 599.99, image: "/placeholder.svg?height=200&width=200" },
]

export default function Home() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-purple-800">Welcome to Gratus</h1>
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
    </Layout>
  )
}