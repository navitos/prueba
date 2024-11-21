'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ProductDetail from '@/app/product/[id]/page'; // Assuming you'll move the component to a separate file

const queryClient = new QueryClient();

export default function ProductDetailPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductDetail />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}