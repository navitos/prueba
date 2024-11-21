'use client';

import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Package, 
  MapPin, 
  ShoppingCart, 
  ChevronDown, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';
import Image from 'next/image';
import { orderService } from '@/services/orderService';
import { useAuth } from '@/services/auth-context';

// Tipos para tipado seguro
interface OrderProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface Order {
  id: number;
  total: string;
  status: string;
  createdAt: string;
  shippingAddress: string;
  Products: OrderProduct[];
}

const OrderDetailsPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (userId) {
        try {
          const userOrders = await orderService.getUserOrders(userId);
          setOrders(userOrders);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };

    fetchOrders();
  }, [userId]);

  const getStatusConfig = (status: string) => {
    const statusConfigMap: Record<string, {
      color: string;
      icon: React.ReactNode;
      label: string;
    }> = {
      'pending': { 
        color: 'bg-yellow-100 text-yellow-800', 
        icon: <AlertTriangle className="text-yellow-500" />,
        label: 'Pendiente' 
      },
      'completed': { 
        color: 'bg-green-100 text-green-800', 
        icon: <CheckCircle className="text-green-500" />,
        label: 'Completado' 
      },
      'shipped': { 
        color: 'bg-blue-100 text-blue-800', 
        icon: <Package className="text-blue-500" />,
        label: 'Enviado' 
      },
      'cancelled': { 
        color: 'bg-red-100 text-red-800', 
        icon: <AlertTriangle className="text-red-500" />,
        label: 'Cancelado' 
      }
    };
  
    return statusConfigMap[status] || {
      color: 'bg-gray-100 text-gray-800', 
      icon: <Clock className="text-gray-500" />,
      label: 'Sin Estado'
    };
  };

  const toggleOrderExpand = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const parseShippingAddress = (addressString: string) => {
    try {
      return JSON.parse(addressString);
    } catch (error) {
      console.error('Error parsing address', error);
      return {};
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <div className="flex items-center mb-8 space-x-4">
          <ShoppingCart className="w-12 h-12 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-800">
            Mis Órdenes
          </h1>
        </div>

        {/* Lista de Órdenes */}
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <Package className="mx-auto mb-4 w-24 h-24 text-gray-300" />
            <p className="text-xl text-gray-500">
              No tienes órdenes recientes
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const shippingAddress = parseShippingAddress(order.shippingAddress);

              return (
                <div 
                  key={order.id} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  {/* Cabecera de Orden */}
                  <div 
                    onClick={() => toggleOrderExpand(order.id)}
                    className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center space-x-4">
                      {statusConfig.icon}
                      <div>
                        <p className="font-semibold text-gray-800">
                          Orden #{order.id}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span 
                        className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}
                      >
                        {statusConfig.label}
                      </span>
                      <ChevronDown 
                        className={`transform transition-transform ${
                          expandedOrderId === order.id ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </div>

                  {/* Detalles de Orden Expandidos */}
                  {expandedOrderId === order.id && (
                    <div className="p-6 bg-gray-50 border-t">
                      {/* Productos */}
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {order.Products.map((product) => (
                          <div 
                            key={product.id} 
                            className="flex items-center bg-white p-4 rounded-lg shadow-md"
                          >
                            <Image 
                              src={product.image} 
                              alt={product.name}
                              width={80} 
                              height={80} 
                              className="rounded-md mr-4"
                            />
                            <div>
                              <h3 className="font-semibold text-gray-800">
                                {product.name}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                ${product.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Información de Envío y Total */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="flex items-center text-lg font-semibold mb-3 text-gray-800">
                            <MapPin className="mr-2 text-blue-600" />
                            Dirección de Envío
                          </h3>
                          <p>{shippingAddress.fullName}</p>
                          <p>{shippingAddress.addressLine1}</p>
                          <p>{shippingAddress.city}, {shippingAddress.state}</p>
                          <p>{shippingAddress.country}</p>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold mb-3 text-gray-800">
                            Resumen de Orden
                          </h3>
                          <div className="flex justify-between mb-2">
                            <span>Total de Productos:</span>
                            <span>{order.Products.length}</span>
                          </div>
                          <div className="flex justify-between font-bold text-xl">
                            <span>Total:</span>
                            <span>${order.total}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsPage;