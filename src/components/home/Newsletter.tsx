import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Newsletter() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-background mb-6">
            <Send className="h-6 w-6 text-primary" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-playfair">
            Stay <span className="text-gradient">Inspired</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive artisan stories, new arrivals, 
            and special promotions. Be the first to discover unique handmade treasures.
          </p>

          {/* Newsletter Form */}
          <div className="bg-card border border-primary/20 rounded-2xl p-2 max-w-md mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button className="sm:w-auto">
                Subscribe
              </Button>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span className="text-sm">No spam, ever</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span className="text-sm">Exclusive discounts</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span className="text-sm">Artisan stories</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
