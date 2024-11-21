"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search } from "lucide-react";
import UserMenu from "./UserMenu";
import axios from "axios";

// Define la interfaz Product
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState<string>(""); 
  const [searchResults, setSearchResults] = useState<Product[]>([]);  
  const [isSearching, setIsSearching] = useState<boolean>(false); 

  // Función para buscar productos
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      resetSearch(); 
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/search?query=${query}`
      );
      setSearchResults(response.data); // response.data debe ser un arreglo de productos
    } catch (error) {
      console.error("Error buscando productos:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Reinicia los resultados de búsqueda al limpiar el input
  const resetSearch = () => {
    setSearchResults([]); // Muestra todos los productos (contenido original)
    setQuery(""); // Limpia el input
  };

  // Busca automáticamente si el usuario borra el texto del input
  useEffect(() => {
    if (query === "") {
      resetSearch();
    }
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col bg-purple-50">
      <header className="bg-purple-700 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Gratus
          </Link>
          <div className="flex-1 mx-4">
            <form className="flex" onSubmit={handleSearch}>
              <Input
                type="search"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-black" // Cambia el color del texto a negro
              />
              <Button type="submit" variant="secondary" className="ml-2">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/cart" className="flex items-center">
              <ShoppingCart className="h-6 w-6 mr-2" />
              Cart
            </Link>
            <UserMenu />
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto py-8">
        {isSearching ? (
          <p className="text-center text-purple-700 font-semibold">
            Searching...
          </p>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md p-4 rounded-lg text-center"
              >
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-purple-700 font-bold">${product.price}</p>
              </div>
            ))}
          </div>
        ) : query && searchResults.length === 0 ? (
          <p className="text-center text-gray-600">
            No products found for {query}
          </p>
        ) : (
          children
        )}
      </main>
      <footer className="bg-purple-800 text-white p-4">
        <div className="container mx-auto text-center">
          © 2024 Gratus. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
