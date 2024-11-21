'use client';

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/services/auth-context';
import { productService } from '@/services/productService';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description?: string;
}

function Products() {
  const { isLoggedIn, userName } = useAuth();

  // Uso de React Query para obtener los productos
  const { data: products = [], isLoading, isError, error, refetch } = useQuery<Product[], Error>({
    queryKey: ['products'], // Clave única para este query
    queryFn: productService.getAllProducts, // Función para obtener los datos
    staleTime: 10000, // Los datos se consideran "frescos" durante 10 segundos
    refetchOnWindowFocus: true, // Refresca automáticamente al enfocar la ventana
  });

  if (isLoading) {
    return <div className="text-center text-xl mt-10">Cargando productos...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Error al cargar productos:</p>
        <p>{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-purple-800">
        {isLoggedIn ? `Bienvenido de nuevo, ${userName}!` : 'Bienvenido a GRATUS'}
      </h1>

      <div className="text-right mb-4">
        <Button onClick={() => refetch()} className="bg-blue-600 hover:bg-blue-700">
          Refrescar Productos
        </Button>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos disponibles</p>
      ) : (
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
                <p className="text-lg font-bold text-purple-600">${product.price}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Link href={`/product/${product.id}`} className="w-full">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Ver Producto</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Products />
      {/* Habilitar Devtools en modo desarrollo */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
