/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  Minus,
  Plus,
  Check,
  MapPin,
  Calendar,
  Award,
  ArrowLeft
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useCart } from '@/contexts/CartContext';
import { useFavorite } from '@/hooks/useFavorite';
import { toast } from 'sonner';

// This would normally come from your data file or API
// For now, let's import from your products data
import { products } from '@/data/products';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const { addItem } = useCart();
  const { handleFavoriteAction } = useFavorite();
  
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the product from your products array
    const foundProduct = products.find(p => p.id === productId);
    setProduct(foundProduct);
    setLoading(false);
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    
    setIsAdding(true);
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image || '/images/placeholder.jpg',
      artisan: product.artisan || 'Artisan'
    };

    addItem(cartItem);
    
    toast.success('Added to cart!', {
      description: `${quantity} × ${product.name}`,
      action: {
        label: 'View Cart',
        onClick: () => window.location.href = '/cart'
      }
    });

    setTimeout(() => setIsAdding(false), 500);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/marketplace">
            <Button>Browse Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Use main image or first image from images array
  const mainImage = product.images?.[0] || product.image;
  const allImages = product.images?.length ? product.images : [product.image];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
            <span>/</span>
            <Link href="/marketplace" className="hover:text-primary">Marketplace</Link>
            <span>/</span>
            <Link href={`/category/${product.categorySlug || product.category?.toLowerCase()}`} className="hover:text-primary">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image - Using object-cover to fill container */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted/20 border group">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                  {discountPercentage}% OFF
                </div>
              )}
              {product.bestSeller && (
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 z-10">
                  <Award className="w-4 h-4" />
                  Best Seller
                </div>
              )}
            </div>

            {/* Thumbnail Gallery - if multiple images exist */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {allImages.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all bg-muted/20 ${
                      selectedImage === index 
                        ? 'border-primary ring-2 ring-primary/20' 
                        : 'border-transparent hover:border-primary/50'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 25vw, 10vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 font-medium">In Stock</span>
                  {product.soldCount && (
                    <span className="text-sm text-muted-foreground">
                      ({product.soldCount} sold)
                    </span>
                  )}
                </>
              ) : (
                <>
                  <span className="text-red-500 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none">
              <p className="text-text/80 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-muted transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-muted transition-colors"
                  disabled={quantity >= 99}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="flex-1 gap-2"
                onClick={handleAddToCart}
                disabled={isAdding || !product.inStock}
              >
                <ShoppingCart className="w-5 h-5" />
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="flex-1 gap-2"
                onClick={toggleWishlist}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Share2 className="w-5 h-5" />
                Share
              </Button>
            </div>

            {/* Shipping & Policies */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-b">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">on orders over $100</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Secure Payment</p>
                <p className="text-xs text-muted-foreground">SSL encrypted</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">30-Day Returns</p>
                <p className="text-xs text-muted-foreground">hassle-free</p>
              </div>
            </div>

            {/* Artisan Info */}
            {(product.artisan || product.artisanLocation || product.artisanSince) && (
              <div className="bg-muted/30 rounded-xl p-6">
                <h3 className="font-heading font-semibold text-lg mb-4">About the Artisan</h3>
                <div className="flex items-start gap-4">
                  {product.artisanAvatar && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={product.artisanAvatar}
                        alt={product.artisan}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{product.artisan}</h4>
                    {product.artisanLocation && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{product.artisanLocation}</span>
                      </div>
                    )}
                    {product.artisanSince && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Creating since {product.artisanSince}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Product Details */}
            <div className="border rounded-xl overflow-hidden">
              <div className="border-b bg-muted/30 px-6 py-3">
                <h3 className="font-semibold">Product Details</h3>
              </div>
              <div className="p-6 space-y-4">
                {/* Specifications */}
                {(product.materials || product.dimensions || product.weight) && (
                  <div className="space-y-2">
                    {product.materials && (
                      <p><span className="font-medium">Materials:</span> {product.materials.join(', ')}</p>
                    )}
                    {product.dimensions && (
                      <p><span className="font-medium">Dimensions:</span> {product.dimensions}</p>
                    )}
                    {product.weight && (
                      <p><span className="font-medium">Weight:</span> {product.weight}</p>
                    )}
                  </div>
                )}

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div>
                    <p className="font-medium mb-2">Tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-muted rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-heading font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* You can add related products here based on category */}
          </div>
        </div>
      </div>
    </div>
  );
}