import Link from "next/link";
import { 
  Facebook, Twitter, Instagram, Youtube, Heart, 
  Mail, Phone, MapPin, CreditCard, Shield, Truck, Users,
  ShoppingBag
} from "lucide-react";

const footerLinks = {
  marketplace: [
    { label: "All Products", href: "/marketplace/all" },
    { label: "New Arrivals", href: "/marketplace/new" },
    { label: "Best Sellers", href: "/marketplace/best-sellers" },
    { label: "On Sale", href: "/marketplace/sale" },
    { label: "Gift Cards", href: "/gift-cards" },
  ],
  categories: [
    { label: "Pottery & Ceramics", href: "/categories/pottery" },
    { label: "Textiles & Weaving", href: "/categories/textiles" },
    { label: "Jewelry", href: "/categories/jewelry" },
    { label: "Woodwork", href: "/categories/woodwork" },
    { label: "Glass Art", href: "/categories/glass" },
  ],
  artisans: [
    { label: "Meet Our Artisans", href: "/artisans" },
    { label: "Become an Artisan", href: "/artisans/apply" },
    { label: "Artisan Stories", href: "/artisans/stories" },
    { label: "Workshops", href: "/artisans/workshops" },
    { label: "Collaborations", href: "/artisans/collaborations" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/about/story" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
};

const socialLinks = [
  { icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com", label: "Facebook" },
  { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com", label: "Twitter" },
  { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com", label: "Instagram" },
  { icon: <Youtube className="h-5 w-5" />, href: "https://youtube.com", label: "YouTube" },
];

const trustBadges = [
  { icon: <Shield className="h-6 w-6" />, text: "Secure Payment", description: "100% secure transactions" },
  { icon: <Truck className="h-6 w-6" />, text: "Free Shipping", description: "On orders over $50" },
  { icon: <CreditCard className="h-6 w-6" />, text: "Easy Returns", description: "30-day return policy" },
  { icon: <Users className="h-6 w-6" />, text: "Artisan Verified", description: "Handmade authenticity" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-primary/5 border-t border-primary/20 mt-auto">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 group mb-6">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <ShoppingBag className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <span className="text-2xl font-bold font-dancing text-primary group-hover:text-primary/90 transition-colors">
                  Handcrafted Haven
                </span>
                <p className="text-sm text-muted-foreground mt-1">
                  Where artistry meets authenticity
                </p>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Discover unique handmade creations from skilled artisans worldwide. 
              Each piece tells a story of craftsmanship, passion, and dedication to traditional techniques.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-8">
              <h3 className="font-semibold text-foreground mb-3">Join Our Community</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Get updates on new arrivals, exclusive offers, and artisan stories.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Follow Us</h3>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4 capitalize">
                {category === "marketplace" ? "Shop" : category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-primary/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  {badge.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{badge.text}</h4>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-primary/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Call Us</h4>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Email Us</h4>
                <p className="text-muted-foreground">support@handcraftedhaven.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Visit Us</h4>
                <p className="text-muted-foreground">123 Artisan Street, Creative City</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-t border-primary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} Handcrafted Haven. All rights reserved.</span>
              <Heart className="h-4 w-4 text-accent" />
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </Link>
              <Link href="/sitemap" className="text-muted-foreground hover:text-primary transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

