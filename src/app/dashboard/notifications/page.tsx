/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  ShoppingBag,
  Heart,
  Package,
  Star,
  Settings,
  Trash2,
  CheckCheck,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface Notification {
  id: string;
  type: 'order' | 'wishlist' | 'review' | 'promo' | 'alert' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

interface NotificationSettings {
  email_notifications: boolean;
  push_notifications: boolean;
  order_updates: boolean;
  promo_offers: boolean;
  wishlist_alerts: boolean;
  review_responses: boolean;
  artisan_updates: boolean;
  newsletter: boolean;
}

export default function NotificationsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    email_notifications: true,
    push_notifications: true,
    order_updates: true,
    promo_offers: false,
    wishlist_alerts: true,
    review_responses: true,
    artisan_updates: false,
    newsletter: true
  });
  const [activeTab, setActiveTab] = useState("all");
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const init = async () => {
      await checkSession();
      await fetchNotifications();
    };
    init();
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

  const fetchNotifications = async () => {
    try {
      // Mock data - replace with actual API call
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'order',
          title: 'Order Confirmed',
          message: 'Your order #ORD-2024-001 has been confirmed and is being processed.',
          time: '2 hours ago',
          read: false,
          actionUrl: '/dashboard/orders/1'
        },
        {
          id: '2',
          type: 'wishlist',
          title: 'Item Back in Stock',
          message: 'The Hand-Thrown Stoneware Vase you wanted is back in stock!',
          time: '5 hours ago',
          read: false,
          actionUrl: '/products/101'
        },
        {
          id: '3',
          type: 'review',
          title: 'Review Received',
          message: 'Someone found your review on Silver Filigree Earrings helpful.',
          time: '1 day ago',
          read: true,
          actionUrl: '/dashboard/reviews'
        },
        {
          id: '4',
          type: 'promo',
          title: 'Flash Sale Alert',
          message: 'Get 30% off on all textiles for the next 24 hours!',
          time: '2 days ago',
          read: true,
          actionUrl: '/marketplace/sale'
        },
        {
          id: '5',
          type: 'info',
          title: 'New Artisan Workshop',
          message: 'Join our upcoming pottery workshop this Saturday.',
          time: '3 days ago',
          read: true,
          actionUrl: '/artisans/workshops'
        }
      ];
      
      setNotifications(mockNotifications);
    } catch {
      toast.error('Failed to fetch notifications');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
    toast.success('Marked as read');
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    toast.success('All notifications marked as read');
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notif => notif.id !== notificationId));
    toast.success('Notification deleted');
  };

  const handleClearAll = () => {
    setNotifications([]);
    setIsClearDialogOpen(false);
    toast.success('All notifications cleared');
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Notification settings saved');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'order': return <Package className="h-5 w-5 text-blue-500" />;
      case 'wishlist': return <Heart className="h-5 w-5 text-red-500" />;
      case 'review': return <Star className="h-5 w-5 text-yellow-500" />;
      case 'promo': return <ShoppingBag className="h-5 w-5 text-green-500" />;
      case 'alert': return <AlertCircle className="h-5 w-5 text-orange-500" />;
      default: return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch(type) {
      case 'order': return 'bg-blue-500/10';
      case 'wishlist': return 'bg-red-500/10';
      case 'review': return 'bg-yellow-500/10';
      case 'promo': return 'bg-green-500/10';
      case 'alert': return 'bg-orange-500/10';
      default: return 'bg-gray-500/10';
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === "unread") return !notif.read;
    if (activeTab === "read") return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
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
              <div className="flex items-center gap-3">
                <Bell className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">Notifications</h1>
                {unreadCount > 0 && (
                  <Badge className="bg-primary">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button variant="outline" onClick={handleMarkAllAsRead}>
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Mark all read
                </Button>
              )}
              {notifications.length > 0 && (
                <Button 
                  variant="outline" 
                  className="text-destructive hover:text-destructive"
                  onClick={() => setIsClearDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear all
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`hover:shadow-md transition-shadow ${!notification.read ? 'border-primary/30 bg-primary/5' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`h-10 w-10 rounded-full ${getNotificationColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h3 className="font-semibold">{notification.title}</h3>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                          </div>
                          {!notification.read && (
                            <Badge variant="default" className="bg-primary">New</Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                          <div className="flex gap-2">
                            {notification.actionUrl && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => router.push(notification.actionUrl!)}
                              >
                                View
                              </Button>
                            )}
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Mark read
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteNotification(notification.id)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center">
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Bell className="h-12 w-12 text-primary/40" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No notifications</h3>
                    <p className="text-muted-foreground">
                      {activeTab === "unread" 
                        ? "You don't have any unread notifications" 
                        : activeTab === "read"
                          ? "You don't have any read notifications"
                          : "You don't have any notifications yet"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Notification Settings */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <p className="text-sm text-muted-foreground">
              Choose how you want to receive notifications
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Delivery Methods */}
            <div className="space-y-4">
              <h3 className="font-medium">Delivery Methods</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.email_notifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, email_notifications: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                  </div>
                  <Switch
                    checked={settings.push_notifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, push_notifications: checked }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4"></div>

            {/* Notification Types */}
            <div className="space-y-4">
              <h3 className="font-medium">Notification Types</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order Updates</p>
                    <p className="text-sm text-muted-foreground">Order confirmations, shipping updates</p>
                  </div>
                  <Switch
                    checked={settings.order_updates}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, order_updates: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Promotional Offers</p>
                    <p className="text-sm text-muted-foreground">Sales, discounts, and special offers</p>
                  </div>
                  <Switch
                    checked={settings.promo_offers}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, promo_offers: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Wishlist Alerts</p>
                    <p className="text-sm text-muted-foreground">Price drops, back in stock items</p>
                  </div>
                  <Switch
                    checked={settings.wishlist_alerts}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, wishlist_alerts: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Review Responses</p>
                    <p className="text-sm text-muted-foreground">When someone responds to your review</p>
                  </div>
                  <Switch
                    checked={settings.review_responses}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, review_responses: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Artisan Updates</p>
                    <p className="text-sm text-muted-foreground">New products from artisans you follow</p>
                  </div>
                  <Switch
                    checked={settings.artisan_updates}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, artisan_updates: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Newsletter</p>
                    <p className="text-sm text-muted-foreground">Monthly newsletter with artisan stories</p>
                  </div>
                  <Switch
                    checked={settings.newsletter}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, newsletter: checked }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="bg-gradient-to-r from-primary to-secondary"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Settings'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clear All Confirmation Dialog */}
      <AlertDialog open={isClearDialogOpen} onOpenChange={setIsClearDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear All Notifications</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete all notifications? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearAll}
              className="bg-destructive hover:bg-destructive/90"
            >
              Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}