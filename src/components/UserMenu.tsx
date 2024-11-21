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
import { User, LogOut, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'; 

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
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setUserName('')
    setUserEmail('')
    setUserAvatar('')
    router.refresh() 
  }

  if (!isLoggedIn) {
    return (
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => router.push('/login')}>
          <LogIn className="mr-2 h-4 w-4" />
          Sign In
        </Button>
        <Link href="/register">
          <Button variant="outline">Register</Button>
        </Link>
      </div>
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
