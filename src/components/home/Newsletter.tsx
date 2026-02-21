/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubscribed(true);
        setEmail('');
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <div className="inline-flex p-3 rounded-full bg-background mb-6 shadow-lg">
          <Send className="h-6 w-6 text-primary" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Stay <span className="text-primary">Inspired</span>
        </h2>
        
        <p className="text-muted-foreground mb-8">
          Subscribe for artisan stories, new arrivals, and exclusive offers.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 bg-card p-2 rounded-2xl border shadow-lg">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-xl bg-background border-0 focus:ring-2 focus:ring-primary"
              disabled={isLoading || isSubscribed}
            />
            <Button 
              type="submit" 
              disabled={isLoading || isSubscribed}
              className="sm:w-auto"
            >
              {isLoading ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Subscribing</>
              ) : isSubscribed ? (
                <><CheckCircle className="h-4 w-4 mr-2" /> Subscribed</>
              ) : (
                'Subscribe'
              )}
            </Button>
          </div>
        </form>

        {isSubscribed && (
          <div className="mt-4 text-green-600 dark:text-green-400">
            <CheckCircle className="h-5 w-5 inline mr-2" />
            <span>You're subscribed!</span>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-accent" /> No spam
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-accent" /> Unsubscribe anytime
          </span>
          <Link href="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </section>
  );
}