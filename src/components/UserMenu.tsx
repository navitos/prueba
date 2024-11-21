'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, LogOut, LogIn, BarChartBig } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function UserMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchProfile(token)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const fetchProfile = async (token: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json()
        setUserName(data.name)
        setUserEmail(data.email)
        setUserAvatar(data.avatar || '/placeholder.svg')
        setIsLoggedIn(true)
        router.refresh()
      } else {
        setIsLoggedIn(false)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      setIsLoggedIn(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    setUserEmail('');
    setUserAvatar('');
    toast.success('Sesión cerrada exitosamente');
    router.refresh();
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => router.push('/login')} className="text-base font-medium text-gray-700 hover:bg-gray-100">
          <LogIn className="mr-2 h-4 w-4" />
          Sign In
        </Button>
        <Link href="/register">
          <Button variant="outline" className="text-base font-medium text-blue-600 hover:bg-blue-50">
            Register
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="text-white font-semibold">{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white rounded-lg shadow-lg ring-1 ring-gray-200" align="end" forceMount>
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center text-gray-700 hover:bg-gray-100 rounded-md py-2 px-3">
            <User className="mr-2 h-5 w-5 text-gray-600" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/orders" className="flex items-center text-gray-700 hover:bg-gray-100 rounded-md py-2 px-3">
            <BarChartBig className="mr-2 h-5 w-5 text-gray-600" />
            <span>Mis pedidos</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600 hover:bg-red-50 rounded-md py-2 px-3">
          <LogOut className="mr-2 h-5 w-5 text-red-600" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
