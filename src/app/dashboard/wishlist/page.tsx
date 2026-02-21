/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle,
  Loader2,
  Calendar,
  Lock
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
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

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex' | 'paypal';
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  cardholderName: string;
  isDefault: boolean;
}

export default function PaymentPage() {
  const router = useRouter();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    isDefault: false
  });

  useEffect(() => {
    checkSession();
    fetchPaymentMethods();
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

  const fetchPaymentMethods = async () => {
    try {
      // Mock data - replace with actual API call
      const mockMethods: PaymentMethod[] = [
        {
          id: '1',
          type: 'visa',
          last4: '4242',
          expiryMonth: '12',
          expiryYear: '2025',
          cardholderName: 'John Doe',
          isDefault: true
        },
        {
          id: '2',
          type: 'mastercard',
          last4: '8888',
          expiryMonth: '06',
          expiryYear: '2024',
          cardholderName: 'John Doe',
          isDefault: false
        }
      ];
      
      setPaymentMethods(mockMethods);
    } catch {
      toast.error('Failed to fetch payment methods');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSavePaymentMethod = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newMethod: PaymentMethod = {
        id: Date.now().toString(),
        type: 'visa',
        last4: formData.cardNumber.slice(-4),
        expiryMonth: formData.expiryMonth,
        expiryYear: formData.expiryYear,
        cardholderName: formData.cardholderName,
        isDefault: formData.isDefault
      };

      if (formData.isDefault) {
        paymentMethods.forEach(method => method.isDefault = false);
      }

      setPaymentMethods([...paymentMethods, newMethod]);
      toast.success('Payment method added successfully');
      setIsDialogOpen(false);
      resetForm();
    } catch {
      toast.error('Failed to add payment method');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteMethod = async () => {
    if (!selectedMethod) return;
    
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setPaymentMethods(paymentMethods.filter(m => m.id !== selectedMethod.id));
      toast.success('Payment method deleted successfully');
      setIsDeleteDialogOpen(false);
    } catch {
      toast.error('Failed to delete payment method');
    } finally {
      setIsSaving(false);
      setSelectedMethod(null);
    }
  };

  const handleSetDefault = async (methodId: string) => {
    try {
      setPaymentMethods(paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === methodId
      })));
      toast.success('Default payment method updated');
    } catch {
      toast.error('Failed to update default payment method');
    }
  };

  const resetForm = () => {
    setFormData({
      cardNumber: '',
      cardholderName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      isDefault: false
    });
  };

  const getCardIcon = (type: string) => {
    switch(type) {
      case 'visa':
        return <CreditCard className="h-5 w-5 text-blue-600" />;
      case 'mastercard':
        return <CreditCard className="h-5 w-5 text-orange-600" />;
      case 'amex':
        return <CreditCard className="h-5 w-5 text-blue-800" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading payment methods...</p>
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
                <CreditCard className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">Payment Methods</h1>
              </div>
            </div>
            <Button
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
              className="bg-gradient-to-r from-primary to-secondary"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {paymentMethods.length > 0 ? (
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <Card key={method.id} className={method.isDefault ? 'border-primary border-2' : ''}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        {getCardIcon(method.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold capitalize">{method.type}</span>
                          <span className="text-muted-foreground">•••• {method.last4}</span>
                          {method.isDefault && (
                            <Badge className="bg-primary">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Expires {method.expiryMonth}/{method.expiryYear}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {method.cardholderName}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!method.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetDefault(method.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Set Default
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => {
                          setSelectedMethod(method);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span>Your payment information is encrypted and secure</span>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-12 w-12 text-primary/40" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No payment methods</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Add a payment method to make checkout faster and easier.
                </p>
                <Button
                  size="lg"
                  onClick={() => {
                    resetForm();
                    setIsDialogOpen(true);
                  }}
                  className="bg-gradient-to-r from-primary to-secondary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Payment Method Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>
              Enter your card details securely
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Card Number */}
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className="mt-1"
                maxLength={19}
              />
            </div>

            {/* Cardholder Name */}
            <div>
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="mt-1"
              />
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="expiryMonth">Month</Label>
                <Input
                  id="expiryMonth"
                  name="expiryMonth"
                  value={formData.expiryMonth}
                  onChange={handleInputChange}
                  placeholder="MM"
                  className="mt-1"
                  maxLength={2}
                />
              </div>
              <div>
                <Label htmlFor="expiryYear">Year</Label>
                <Input
                  id="expiryYear"
                  name="expiryYear"
                  value={formData.expiryYear}
                  onChange={handleInputChange}
                  placeholder="YY"
                  className="mt-1"
                  maxLength={2}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  name="cvv"
                  type="password"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className="mt-1"
                  maxLength={3}
                />
              </div>
            </div>

            {/* Default Payment Method */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isDefault"
                checked={formData.isDefault}
                onCheckedChange={(checked: boolean) => 
                  setFormData(prev => ({ ...prev, isDefault: checked }))
                }
              />
              <Label htmlFor="isDefault">Set as default payment method</Label>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4 p-3 bg-muted/30 rounded-lg">
              <Lock className="h-3 w-3" />
              <span>Your information is encrypted and secure. We never store your full card details.</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSavePaymentMethod}
              disabled={isSaving}
              className="bg-gradient-to-r from-primary to-secondary"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Payment Method'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Payment Method</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this payment method? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSaving}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMethod}
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