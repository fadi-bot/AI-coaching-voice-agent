"use client"

import { useUser } from '@stackframe/stack';
import { Button } from '../../../components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function WorkspaceLayout({ children, title, description }) {
  const user = useUser();

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className='font-medium text-gray-500'>My Workspace</h2>
          <h1 className='text-3xl font-bold'>{title || `Welcome Back, ${user?.displayName || 'User'}`}</h1>
          {description && <p className="text-gray-600 mt-2">{description}</p>}
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/app/dashboard">
            <Button variant="outline" className="mr-2">Back to Dashboard</Button>
          </Link>
          <Button className="text-white">Profile</Button>
        </div>
      </div>
      
      {children}
    </div>
  );
}
