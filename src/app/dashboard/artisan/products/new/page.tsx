/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Save,
  Loader2,
  Upload,
  X,
  Plus,
  Tag,
  Package,
  DollarSign,
  FileText,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface ProductFormData {
  // Basic Info
  name: string;
  description: string;
  category: string;
  tags: string[];
  
  // Pricing
  price: string;
  compareAtPrice: string;
  costPerItem: string;
  
  // Inventory
  sku: string;
  quantity: string;
  trackQuantity: boolean;
  continueSelling: boolean;
  
  // Shipping
  weight: string;
  weightUnit: 'lb' | 'oz' | 'kg' | 'g';
  requiresShipping: boolean;
  
  // Media
  images: File[];
  imagePreviews: string[];
  
  // SEO
  seoTitle: string;
  seoDescription: string;
  seoSlug: string;
}

const categories = [
  "Pottery",
  "Ceramics",
  "Jewelry",
  "Woodwork",
  "Textiles",
  "Glass",
  "Metalwork",
  "Leather",
  "Paper",
  "Basketry",
  "Candles",
  "Other"
];

export default function AddProductPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [tagInput, setTagInput] = useState("");
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    category: "",
    tags: [],
    price: "",
    compareAtPrice: "",
    costPerItem: "",
    sku: "",
    quantity: "",
    trackQuantity: true,
    continueSelling: false,
    weight: "",
    weightUnit: 'lb',
    requiresShipping: true,
    images: [],
    imagePreviews: [],
    seoTitle: "",
    seoDescription: "",
    seoSlug: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate SEO slug from name
    if (name === 'name') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, seoSlug: slug }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is larger than 5MB`);
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, file],
          imagePreviews: [...prev.imagePreviews, reader.result as string]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imagePreviews: prev.imagePreviews.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    if (!formData.name) {
      toast.error('Product name is required');
      setActiveTab("basic");
      return false;
    }
    if (!formData.price) {
      toast.error('Price is required');
      setActiveTab("pricing");
      return false;
    }
    if (formData.images.length === 0) {
      toast.error('At least one product image is required');
      setActiveTab("media");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Product created successfully!');
      router.push('/dashboard/artisan/products');
    } catch {
      toast.error('Failed to create product');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-background to-primary/5">
      {/* Header */}
      <div className="bg-background border-b border-primary/10 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Add New Product</h1>
                <p className="text-sm text-muted-foreground">
                  List a new handmade item in your shop
                </p>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={isSaving}
              className="bg-gradient-to-r from-secondary to-primary"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Product
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Tell customers about your handmade creation
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Product Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Product Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Hand-Thrown Stoneware Vase"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your product, materials, techniques, and story..."
                      rows={6}
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.description.length}/5000 characters
                    </p>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add tags (e.g., handmade, ceramic, gift)"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" onClick={addTag} variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="gap-1">
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Set your product price and compare at price
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Price */}
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Price <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Compare at Price */}
                  <div className="space-y-2">
                    <Label htmlFor="compareAtPrice">Compare at Price</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="compareAtPrice"
                        name="compareAtPrice"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.compareAtPrice}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Original price for showing discounts
                    </p>
                  </div>

                  {/* Cost per item */}
                  <div className="space-y-2">
                    <Label htmlFor="costPerItem">Cost per item (Optional)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="costPerItem"
                        name="costPerItem"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.costPerItem}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Inventory Tab */}
            <TabsContent value="inventory">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Manage your stock and shipping
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* SKU */}
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                    <Input
                      id="sku"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      placeholder="e.g., VASE-001"
                    />
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="0"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="0"
                    />
                  </div>

                  {/* Track Quantity */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Track quantity</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically track inventory levels
                      </p>
                    </div>
                    <Switch
                      checked={formData.trackQuantity}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, trackQuantity: checked }))
                      }
                    />
                  </div>

                  {/* Continue selling when out of stock */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Continue selling when out of stock</p>
                      <p className="text-sm text-muted-foreground">
                        Allow customers to purchase when out of stock
                      </p>
                    </div>
                    <Switch
                      checked={formData.continueSelling}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, continueSelling: checked }))
                      }
                    />
                  </div>

                  <div className="border-t pt-4"></div>

                  {/* Shipping */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Shipping</h3>
                    
                    {/* Weight */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight</Label>
                        <Input
                          id="weight"
                          name="weight"
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.weight}
                          onChange={handleInputChange}
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weightUnit">Unit</Label>
                        <Select
                          value={formData.weightUnit}
                          onValueChange={(value: any) => 
                            setFormData(prev => ({ ...prev, weightUnit: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lb">Pounds (lb)</SelectItem>
                            <SelectItem value="oz">Ounces (oz)</SelectItem>
                            <SelectItem value="kg">Kilograms (kg)</SelectItem>
                            <SelectItem value="g">Grams (g)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Requires Shipping */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">This is a physical product</p>
                        <p className="text-sm text-muted-foreground">
                          Requires shipping to customer
                        </p>
                      </div>
                      <Switch
                        checked={formData.requiresShipping}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, requiresShipping: checked }))
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="media">
              <Card>
                <CardHeader>
                  <CardTitle>Product Media</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Add photos of your handmade creation
                  </p>
                </CardHeader>
                <CardContent>
                  {/* Image Upload */}
                  <div className="space-y-4">
                    <div
                      className="border-2 border-dashed border-primary/20 rounded-xl p-8 text-center hover:border-primary/40 transition-colors cursor-pointer"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      <input
                        id="image-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="font-medium mb-1">Click to upload images</p>
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG, WEBP up to 5MB each
                      </p>
                    </div>

                    {/* Image Preview Grid */}
                    {formData.imagePreviews.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {formData.imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group aspect-square rounded-lg border overflow-hidden">
                            <Image
                              src={preview}
                              alt={`Product preview ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            {index === 0 && (
                              <Badge className="absolute bottom-2 left-2 bg-primary">
                                Primary
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SEO Tab */}
            <TabsContent value="seo">
              <Card>
                <CardHeader>
                  <CardTitle>Search Engine Optimization</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Help customers find your products in search                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* SEO Title */}
                  <div className="space-y-2">
                    <Label htmlFor="seoTitle">SEO Title</Label>
                    <Input
                      id="seoTitle"
                      name="seoTitle"
                      value={formData.seoTitle}
                      onChange={handleInputChange}
                      placeholder="Enter SEO title"
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.seoTitle.length}/70 characters recommended
                    </p>
                  </div>

                  {/* SEO Description */}
                  <div className="space-y-2">
                    <Label htmlFor="seoDescription">SEO Description</Label>
                    <Textarea
                      id="seoDescription"
                      name="seoDescription"
                      value={formData.seoDescription}
                      onChange={handleInputChange}
                      placeholder="Enter meta description"
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.seoDescription.length}/160 characters recommended
                    </p>
                  </div>

                  {/* URL Slug */}
                  <div className="space-y-2">
                    <Label htmlFor="seoSlug">URL Slug</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        handcraftedhaven.com/products/
                      </span>
                      <Input
                        id="seoSlug"
                        name="seoSlug"
                        value={formData.seoSlug}
                        onChange={handleInputChange}
                        placeholder="product-url-slug"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  {/* SEO Preview */}
                  <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                    <h4 className="font-medium mb-2">Search Engine Preview</h4>
                    <div className="space-y-1">
                      <p className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
                        {formData.seoTitle || formData.name || 'Product Title'}
                      </p>
                      <p className="text-green-700 text-sm">
                        handcraftedhaven.com/products/{formData.seoSlug || 'product-url'}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {formData.seoDescription || formData.description || 'Product description will appear here...'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Bottom Action Bar */}
          <div className="sticky bottom-0 mt-8 bg-background border-t border-primary/10 p-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-gradient-to-r from-secondary to-primary"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Product
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
               