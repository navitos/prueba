'use client';

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { authService } from '@/services/authService'
import { toast } from 'react-hot-toast';

export default function Profile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await authService.getUserProfile()
        setName(user.name)
        setEmail(user.email)
      } catch(_error) {
        toast.error('Failed to load profile'); 
      }
    }

    loadProfile()
  }, [])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedUser = await authService.updateProfile(name, email);
      setName(updatedUser.name);
      setEmail(updatedUser.email);
      toast.success('Perfil actualizado con éxito'); 
    } catch (_error) {
      toast.error('Error al actualizar el perfil');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      await authService.updatePassword(password, newPassword); 
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success('Tu contraseña ha sido actualizada con éxito'); 
    } catch (_error) {
      toast.error('Error al cambiar la contraseña');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-800">Your Account</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-purple-700">Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage src="/placeholder.svg?height=128&width=128" alt={name} />
              <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold text-purple-800">{name}</h2>
            <p className="text-gray-600">{email}</p>
          </CardContent>
        </Card>
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-purple-700">Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Edit Profile</TabsTrigger>
                <TabsTrigger value="password">Change Password</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <form onSubmit={handleProfileUpdate} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Update Profile</Button>
                </form>
              </TabsContent>
              <TabsContent value="password">
                <form onSubmit={handlePasswordChange} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="current-password" className="text-sm font-medium text-gray-700">Current Password</label>
                    <Input
                      id="current-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="new-password" className="text-sm font-medium text-gray-700">New Password</label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">Confirm New Password</label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Change Password</Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}