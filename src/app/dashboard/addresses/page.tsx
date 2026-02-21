"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Home,
  Building,
  Loader2,
  Phone
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type AddressType = 'home' | 'work' | 'other';

interface Address {
  id: string;
  type: AddressType;
  name: string;
  recipient_name: string;
  street_address: string;
  apartment?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
  is_default: boolean;
}

interface FormData {
  type: AddressType;
  name: string;
  recipient_name: string;
  street_address: string;
  apartment: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
  is_default: boolean;
}

export default function AddressesPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    type: 'home',
    name: '',
    recipient_name: '',
    street_address: '',
    apartment: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'United States',
    phone: '',
    is_default: false
  });

  useEffect(() => {
    const init = async () => {
      await checkSession();
      await fetchAddresses();
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

  const fetchAddresses = async () => {
    try {
      // Mock data - replace with actual API call
      const mockAddresses: Address[] = [
        {
          id: '1',
          type: 'home',
          name: 'Home',
          recipient_name: 'John Doe',
          street_address: '123 Main Street',
          apartment: 'Apt 4B',
          city: 'New York',
          state: 'NY',
          postal_code: '10001',
          country: 'United States',
          phone: '+1 (555) 123-4567',
          is_default: true
        },
        {
          id: '2',
          type: 'work',
          name: 'Office',
          recipient_name: 'John Doe',
          street_address: '456 Business Ave',
          apartment: '',
          city: 'New York',
          state: 'NY',
          postal_code: '10002',
          country: 'United States',
          phone: '+1 (555) 987-6543',
          is_default: false
        }
      ];
      
      setAddresses(mockAddresses);
    } catch {
      toast.error('Failed to fetch addresses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newAddress: Address = {
        id: Date.now().toString(),
        ...formData,
        recipient_name: formData.recipient_name || formData.name
      };

      if (formData.is_default) {
        addresses.forEach(addr => addr.is_default = false);
      }

      if (selectedAddress) {
        // Update existing
        setAddresses(addresses.map(addr => 
          addr.id === selectedAddress.id ? { ...newAddress, id: addr.id } : addr
        ));
        toast.success('Address updated successfully');
      } else {
        // Add new
        setAddresses([...addresses, newAddress]);
        toast.success('Address added successfully');
      }

      setIsDialogOpen(false);
      resetForm();
    } catch {
      toast.error('Failed to save address');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAddress = async () => {
    if (!selectedAddress) return;
    
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAddresses(addresses.filter(addr => addr.id !== selectedAddress.id));
      toast.success('Address deleted successfully');
      setIsDeleteDialogOpen(false);
    } catch {
      toast.error('Failed to delete address');
    } finally {
      setIsSaving(false);
      setSelectedAddress(null);
    }
  };

  const handleSetDefault = async (addressId: string) => {
    try {
      setAddresses(addresses.map(addr => ({
        ...addr,
        is_default: addr.id === addressId
      })));
      toast.success('Default address updated');
    } catch {
      toast.error('Failed to update default address');
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'home',
      name: '',
      recipient_name: '',
      street_address: '',
      apartment: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'United States',
      phone: '',
      is_default: false
    });
    setSelectedAddress(null);
  };

  const openEditDialog = (address: Address) => {
    setSelectedAddress(address);
    setFormData({
      type: address.type,
      name: address.name,
      recipient_name: address.recipient_name,
      street_address: address.street_address,
      apartment: address.apartment || '',
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
      phone: address.phone,
      is_default: address.is_default
    });
    setIsDialogOpen(true);
  };

  const getAddressTypeIcon = (type: string) => {
    switch(type) {
      case 'home': return <Home className="h-4 w-4" />;
      case 'work': return <Building className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading addresses...</p>
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
                <MapPin className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">Saved Addresses</h1>
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
              Add New Address
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {addresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <Card key={address.id} className={address.is_default ? 'border-primary border-2' : ''}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {getAddressTypeIcon(address.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{address.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {address.type.charAt(0).toUpperCase() + address.type.slice(1)}
                        </p>
                      </div>
                    </div>
                    {address.is_default && (
                      <Badge className="bg-primary">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Default
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">{address.recipient_name}</p>
                    <p>{address.street_address}</p>
                    {address.apartment && <p>{address.apartment}</p>}
                    <p>{address.city}, {address.state} {address.postal_code}</p>
                    <p>{address.country}</p>
                    <div className="flex items-center gap-2 pt-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{address.phone}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(address)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    {!address.is_default && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(address.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Set Default
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive ml-auto"
                      onClick={() => {
                        setSelectedAddress(address);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
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
                  <MapPin className="h-12 w-12 text-primary/40" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No addresses saved</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Add your shipping addresses to make checkout faster and easier.
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
                  Add Your First Address
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add/Edit Address Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
            <DialogDescription>
              {selectedAddress ? 'Update your address details' : 'Enter your shipping address details'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            {/* Address Type */}
            <div>
              <Label>Address Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value: AddressType) => setFormData(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Address Name */}
            <div>
              <Label htmlFor="name">Address Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Home, Office, etc."
                className="mt-1"
              />
            </div>

            {/* Recipient Name */}
            <div>
              <Label htmlFor="recipient_name">Recipient Name</Label>
              <Input
                id="recipient_name"
                name="recipient_name"
                value={formData.recipient_name}
                onChange={handleInputChange}
                placeholder="Full name"
                className="mt-1"
              />
            </div>

            {/* Street Address */}
            <div>
              <Label htmlFor="street_address">Street Address</Label>
              <Input
                id="street_address"
                name="street_address"
                value={formData.street_address}
                onChange={handleInputChange}
                placeholder="Street address"
                className="mt-1"
              />
            </div>

            {/* Apartment */}
            <div>
              <Label htmlFor="apartment">Apartment, Suite, etc. (Optional)</Label>
              <Input
                id="apartment"
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
                placeholder="Apt, Suite, Unit"
                className="mt-1"
              />
            </div>

            {/* City */}
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="mt-1"
              />
            </div>

            {/* State and Postal Code */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="postal_code">Postal Code</Label>
                <Input
                  id="postal_code"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleInputChange}
                  placeholder="Postal code"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <Label htmlFor="country">Country</Label>
              <Select 
                value={formData.country} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone number"
                className="mt-1"
              />
            </div>

            {/* Default Address */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_default"
                checked={formData.is_default}
                onCheckedChange={(checked: boolean) => 
                  setFormData(prev => ({ ...prev, is_default: checked }))
                }
              />
              <Label htmlFor="is_default">Set as default address</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsDialogOpen(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveAddress}
              disabled={isSaving}
              className="bg-gradient-to-r from-primary to-secondary"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                selectedAddress ? 'Update Address' : 'Add Address'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Address</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this address? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSaving}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAddress}
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