"use client";

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const KEY = '123456';
const STORAGE_KEY = 'auth_key';

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem(STORAGE_KEY);
    if (storedKey === KEY) {
      setIsAuthed(true);
    } else {
      setIsOpen(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === KEY) {
      localStorage.setItem(STORAGE_KEY, key);
      setIsAuthed(true);
      setIsOpen(false);
      toast.success('Authentication successful');
    } else {
      toast.error('Invalid key');
    }
  };

  if (!isAuthed) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Authentication Key</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return children;
}