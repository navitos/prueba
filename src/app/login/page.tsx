"use client"; 

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { authService } from '@/services/authService'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.login(email, password);
      router.push('/'); 
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Login failed. Please try again.');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-purple-800">Sign In</CardTitle>
          <CardDescription className="text-center">to continue to GRATUS</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            <Button type="submit" className="w-full mt-6 bg-purple-600 hover:bg-purple-700">Sign In</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center">
            By continuing, you agree to GRATUS&apos;s <Link href="/conditions" className="text-purple-600 hover:underline">Conditions of Use</Link> and <Link href="/privacy" className="text-purple-600 hover:underline">Privacy Notice</Link>.
          </div>
          <div className="text-sm text-center">
            New to GRATUS? <Link href="/register" className="text-purple-600 hover:underline">Create your GRATUS account</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
