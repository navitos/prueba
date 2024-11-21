'use client'

import { useState } from 'react'
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

export default function UserMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Default to logged out
  const [userName, setUserName] = useState('') // Initialize with empty string

  const handleLogin = () => {
    // TODO: Implement actual login logic
    setIsLoggedIn(true)
    setUserName('John Doe') // Set a default name for demonstration
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserName('')
  }

  if (!isLoggedIn) {
    return (
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={handleLogin}>
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
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt={userName} />
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