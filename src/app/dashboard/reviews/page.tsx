"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ArrowLeft,
  Edit,
  Trash2,
  ThumbsUp,
  MessageSquare,
  Calendar,
  Filter,
  CheckCircle,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";

interface Review {
  id: string;
  product_id: number;
  product_name: string;
  product_image: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful_count: number;
  verified_purchase: boolean;
  status: 'published' | 'pending' | 'rejected';
  images?: string[];
}

export default function ReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [isSaving, setIsSaving] = useState(false);
  const [filterRating, setFilterRating] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  useEffect(() => {
    checkSession();
    fetchReviews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch('/api/auth/session');
      const data = await response.json();
      if (!data.authenticated) {
        router.push('/auth/signin');
      }
    } catch {
      router.push('/auth/signin');
    }
  };

  const fetchReviews = async () => {
    try {
      // Mock data - replace with actual API call
      const mockReviews: Review[] = [
        {
          id: '1',
          product_id: 101,
          product_name: "Hand-Thrown Stoneware Vase",
          product_image: "/images/products/pottery/vase-1.avif",
          rating: 5,
          title: "Absolutely beautiful!",
          content: "This vase is even more stunning in person. The craftsmanship is exceptional and the glaze has beautiful depth. It's now the centerpiece of my living room.",
          date: "2024-02-15",
          helpful_count: 12,
          verified_purchase: true,
          status: 'published'
        },
        {
          id: '2',
          product_id: 102,
          product_name: "Silver Filigree Earrings",
          product_image: "/images/products/jewelry/earrings-1.avif",
          rating: 4,
          title: "Elegant and lightweight",
          content: "These earrings are beautifully crafted and very lightweight. They're perfect for everyday wear. Would have given 5 stars if the clasp was a bit more secure.",
          date: "2024-02-10",
          helpful_count: 5,
          verified_purchase: true,
          status: 'published'
        },
        {
          id: '3',
          product_id: 103,
          product_name: "Walnut End-Grain Board",
          product_image: "/images/products/woodwork/cutting-board-1.avif",
          rating: 5,
          title: "Heirloom quality",
          content: "This cutting board is absolutely gorgeous. The end-grain construction is perfect for knives and it's clear that a lot of care went into its creation. Worth every penny!",
          date: "2024-02-05",
          helpful_count: 8,
          verified_purchase: true,
          status: 'published'
        },
        {
          id: '4',
          product_id: 104,
          product_name: "Handwoven Wool Blanket",
          product_image: "/images/products/textiles/blanket-1.avif",
          rating: 3,
          title: "Nice but smaller than expected",
          content: "The blanket is well-made and the pattern is lovely, but it's smaller than the dimensions listed. Still a nice piece but disappointed about the size.",
          date: "2024-02-01",
          helpful_count: 3,
          verified_purchase: true,
          status: 'pending'
        }
      ];
      
      setReviews(mockReviews);
    } catch {
      toast.error('Failed to fetch reviews');
    } finally {
      setIsLoading(false);
    }
  };

  const getRatingCounts = () => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      counts[review.rating as keyof typeof counts]++;
    });
    return counts;
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  const filteredReviews = reviews.filter(review => {
    if (filterRating === "all") return true;
    return review.rating === parseInt(filterRating);
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch(sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "helpful":
        return b.helpful_count - a.helpful_count;
      default:
        return 0;
    }
  });

  const handleEditReview = (review: Review) => {
    setSelectedReview(review);
    setEditContent(review.content);
    setEditRating(review.rating);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedReview) return;
    
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setReviews(reviews.map(r => 
        r.id === selectedReview.id 
          ? { ...r, content: editContent, rating: editRating }
          : r
      ));
      
      toast.success('Review updated successfully');
      setIsEditDialogOpen(false);
    } catch {
      toast.error('Failed to update review');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!selectedReview) return;
    
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setReviews(reviews.filter(r => r.id !== selectedReview.id));
      toast.success('Review deleted successfully');
      setIsDeleteDialogOpen(false);
    } catch {
      toast.error('Failed to delete review');
    } finally {
      setIsSaving(false);
      setSelectedReview(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'published':
        return <Badge className="bg-green-500">Published</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading reviews...</p>
        </div>
      </div>
    );
  }

  const ratingCounts = getRatingCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <div className="bg-background border-b border-primary/10 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <Star className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">My Reviews</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Rating Summary */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(averageRating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on {reviews.length} reviews
                </p>
              </div>

              <div className="md:col-span-2 space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm w-8">{rating} ★</span>
                    <Progress 
                      value={reviews.length > 0 ? (ratingCounts[rating as keyof typeof ratingCounts] / reviews.length) * 100 : 0} 
                      className="h-2"
                    />
                    <span className="text-sm text-muted-foreground w-8">
                      {ratingCounts[rating as keyof typeof ratingCounts]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="highest">Highest Rated</SelectItem>
                    <SelectItem value="lowest">Lowest Rated</SelectItem>
                    <SelectItem value="helpful">Most Helpful</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        {sortedReviews.length > 0 ? (
          <div className="space-y-4">
            {sortedReviews.map((review) => (
              <Card key={review.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Product Image */}
                    <Link href={`/products/${review.product_id}`} className="shrink-0">
                      <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                        <Image
                          src={review.product_image}
                          alt={review.product_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>

                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Link 
                            href={`/products/${review.product_id}`}
                            className="font-semibold hover:text-primary transition-colors"
                          >
                            {review.product_name}
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= review.rating
                                      ? 'text-yellow-400 fill-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {review.rating}.0
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(review.status)}
                          {review.verified_purchase && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>

                      <h4 className="font-medium mb-2">{review.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {review.content}
                      </p>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <ThumbsUp className="h-4 w-4" />
                          {review.helpful_count} found this helpful
                        </div>
                        {review.images && review.images.length > 0 && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MessageSquare className="h-4 w-4" />
                            {review.images.length} photos
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditReview(review)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => {
                            setSelectedReview(review);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-12 w-12 text-primary/40" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  When you review products you&apos;ve purchased, they&apos;ll appear here.
                </p>
                <Button
                  size="lg"
                  onClick={() => router.push('/dashboard/orders')}
                  className="bg-gradient-to-r from-primary to-secondary"
                >
                  View Your Orders
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Review Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
            <DialogDescription>
              Update your review for {selectedReview?.product_name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Rating */}
            <div>
              <label className="text-sm font-medium mb-2 block">Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setEditRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= editRating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Content */}
            <div>
              <label className="text-sm font-medium mb-2 block">Your Review</label>
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={5}
                placeholder="Share your experience with this product..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              disabled={isSaving || !editContent.trim()}
              className="bg-gradient-to-r from-primary to-secondary"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this review? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSaving}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteReview}
              disabled={isSaving}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}