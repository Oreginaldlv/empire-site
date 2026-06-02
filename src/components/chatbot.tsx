'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { MessageSquare, Send } from 'lucide-react';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="icon"
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl z-50"
      >
        <MessageSquare className="h-8 w-8" />
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle>Oreginald Assistant</SheetTitle>
            <SheetDescription>
              Your AI-powered guide to the Oreginald Dynasty. How can I help you today?
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="flex-1 my-4 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarFallback>OA</AvatarFallback>
                </Avatar>
                <div className="bg-background p-3 rounded-lg max-w-[80%]">
                  <p className="text-sm">
                    Welcome to Oreginald Inc.! I can help you navigate our ventures.
                    What are you looking for?
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
          <SheetFooter>
            <div className="relative w-full">
              <Input placeholder="Type your message..." className="pr-12" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
