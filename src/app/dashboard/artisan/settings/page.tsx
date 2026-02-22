/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Settings,
  ArrowLeft,
  Save,
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Award,
  Briefcase,
  Calendar,
  Upload,
  X,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ArtisanProfile {
  // Personal Info
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  story: string;
  
  // Artisan Info
  specialty: string;
  yearsExperience: string;
  skills: string[];
  materials: string[];
  
  // Shop Info
  shopName: string;
  shopDescription: string;
  returnPolicy: string;
  shippingPolicy: string;
  
  // Social Links
  website: string;
  instagram: string;
  facebook: string;
  twitter: string;
  
  // Media
  avatar: string | null;
  coverImage: string | null;
  portfolio: string[];
  
  // Settings
  emailNotifications: boolean;
  orderNotifications: boolean;
  messageNotifications: boolean;
  reviewNotifications: boolean;
}

export default function ArtisanSettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [skillInput, setSkillInput] = useState("");
  const [materialInput, setMaterialInput] = useState("");
  
  const [profile, setProfile] = useState<ArtisanProfile>({
    name: "Elena Chen",
    email: "elena.chen@example.com",
    phone: "+1 (555) 123-4567",
    location: "Kyoto, Japan",
    bio: "Traditional potter with 15 years of experience in Japanese ceramics. Specializing in Raku and Stoneware.",
    story: "I learned pottery from my grandmother in a small village in Japan. Now I run my own studio in Kyoto, creating pieces that blend traditional techniques with modern design.",
    
    specialty: "Pottery & Ceramics",
    yearsExperience: "15",
    skills: ["Raku firing", "Wheel throwing", "Glaze formulation", "Hand building"],
    materials: ["Stoneware clay", "Porcelain", "Natural glazes", "Copper"],
    
    shopName: "Elena Chen Ceramics",
    shopDescription: "Handcrafted pottery inspired by Japanese traditions",
    returnPolicy: "I accept returns within 30 days of delivery. Items must be unused and in original packaging.",
    shippingPolicy: "Free shipping on orders over $100. All orders are shipped within 3-5 business days.",
    
    website: "https://elenachenceramics.com",
    instagram: "https://instagram.com/elenachen_ceramics",
    facebook: "https://facebook.com/elenachenceramics",
    twitter: "https://twitter.com/elenachen_ceramics",
    
    avatar: null,
    coverImage: null,
    portfolio: [],
    
    emailNotifications: true,
    orderNotifications: true,
    messageNotifications: true,
    reviewNotifications: true
  });

  useEffect(() => {
    const init = async () => {
      await checkSession();
      await fetchProfile();
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch('/api/auth/session');
      const data = await response.json();
      if (!data.authenticated || !data.user.is_artisan) {
        router.push('/dashboard');
      }
    } catch {
      router.push('/auth/signin');
    }
  };

  const fetchProfile = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    } catch {
      toast.error('Failed to load profile');
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleAddMaterial = () => {
    if (materialInput.trim() && !profile.materials.includes(materialInput.trim())) {
      setProfile(prev => ({
        ...prev,
        materials: [...prev.materials, materialInput.trim()]
      }));
      setMaterialInput("");
    }
  };

  const handleRemoveMaterial = (material: string) => {
    setProfile(prev => ({
      ...prev,
      materials: prev.materials.filter(m => m !== material)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Profile updated successfully');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

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
              <div className="flex items-center gap-3">
                <Settings className="h-6 w-6 text-secondary" />
                <h1 className="text-2xl font-bold">Artisan Settings</h1>
              </div>
            </div>
            <Button
              onClick={handleSave}
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
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="shop">Shop Info</TabsTrigger>
            <TabsTrigger value="skills">Skills & Materials</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Update your personal information and public profile
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="space-y-2">
                  <Label>Profile Photo</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="bg-gradient-to-br from-secondary to-primary text-white text-xl">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive">
                        <X className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      name="location"
                      value={profile.location}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Short Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                {/* Story */}
                <div className="space-y-2">
                  <Label htmlFor="story">Your Story</Label>
                  <Textarea
                    id="story"
                    name="story"
                    value={profile.story}
                    onChange={handleInputChange}
                    rows={5}
                  />
                  <p className="text-xs text-muted-foreground">
                    Share your journey as an artisan
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shop Info Tab */}
          <TabsContent value="shop">
            <Card>
              <CardHeader>
                <CardTitle>Shop Information</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Manage your shop details and policies
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Shop Name */}
                <div className="space-y-2">
                  <Label htmlFor="shopName">Shop Name</Label>
                  <Input
                    id="shopName"
                    name="shopName"
                    value={profile.shopName}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Shop Description */}
                <div className="space-y-2">
                  <Label htmlFor="shopDescription">Shop Description</Label>
                  <Textarea
                    id="shopDescription"
                    name="shopDescription"
                    value={profile.shopDescription}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                {/* Specialty */}
                <div className="space-y-2">
                  <Label htmlFor="specialty">Primary Specialty</Label>
                  <Input
                    id="specialty"
                    name="specialty"
                    value={profile.specialty}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Years Experience */}
                <div className="space-y-2">
                  <Label htmlFor="yearsExperience">Years of Experience</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="yearsExperience"
                      name="yearsExperience"
                      value={profile.yearsExperience}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="border-t pt-4"></div>

                {/* Social Links */}
                <h3 className="font-medium">Social Media Links</h3>
                
                {/* Website */}
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      name="website"
                      value={profile.website}
                      onChange={handleInputChange}
                      placeholder="https://yourwebsite.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Instagram */}
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="instagram"
                      name="instagram"
                      value={profile.instagram}
                      onChange={handleInputChange}
                      placeholder="https://instagram.com/yourprofile"
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Facebook */}
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <div className="relative">
                    <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="facebook"
                      name="facebook"
                      value={profile.facebook}
                      onChange={handleInputChange}
                      placeholder="https://facebook.com/yourpage"
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Twitter */}
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="twitter"
                      name="twitter"
                      value={profile.twitter}
                      onChange={handleInputChange}
                      placeholder="https://twitter.com/yourprofile"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="border-t pt-4"></div>

                {/* Policies */}
                <h3 className="font-medium">Shop Policies</h3>
                
                {/* Return Policy */}
                <div className="space-y-2">
                  <Label htmlFor="returnPolicy">Return Policy</Label>
                  <Textarea
                    id="returnPolicy"
                    name="returnPolicy"
                    value={profile.returnPolicy}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                {/* Shipping Policy */}
                <div className="space-y-2">
                  <Label htmlFor="shippingPolicy">Shipping Policy</Label>
                  <Textarea
                    id="shippingPolicy"
                    name="shippingPolicy"
                    value={profile.shippingPolicy}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills & Materials Tab */}
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills & Materials</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Showcase your expertise and the materials you work with
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Skills */}
                <div className="space-y-2">
                  <Label>Skills & Techniques</Label>
                  <div className="flex gap-2">
                    <Input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="Add a skill (e.g., Wheel throwing)"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                    />
                    <Button type="button" onClick={handleAddSkill} variant="outline">
                      Add
                    </Button>
                  </div>
                  {profile.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {profile.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="gap-1">
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Materials */}
                <div className="space-y-2">
                  <Label>Materials Used</Label>
                  <div className="flex gap-2">
                    <Input
                      value={materialInput}
                      onChange={(e) => setMaterialInput(e.target.value)}
                      placeholder="Add a material (e.g., Stoneware clay)"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMaterial())}
                    />
                    <Button type="button" onClick={handleAddMaterial} variant="outline">
                      Add
                    </Button>
                  </div>
                  {profile.materials.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {profile.materials.map((material) => (
                        <Badge key={material} variant="secondary" className="gap-1">
                          {material}
                          <button
                            type="button"
                            onClick={() => handleRemoveMaterial(material)}
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

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Choose how you want to receive notifications
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={profile.emailNotifications}
                    onCheckedChange={(checked) => 
                      setProfile(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when you receive a new order
                    </p>
                  </div>
                  <Switch
                    checked={profile.orderNotifications}
                    onCheckedChange={(checked) => 
                      setProfile(prev => ({ ...prev, orderNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Message Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when customers send you messages
                    </p>
                  </div>
                  <Switch
                    checked={profile.messageNotifications}
                    onCheckedChange={(checked) => 
                      setProfile(prev => ({ ...prev, messageNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Review Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when customers leave reviews
                    </p>
                  </div>
                  <Switch
                    checked={profile.reviewNotifications}
                    onCheckedChange={(checked) => 
                      setProfile(prev => ({ ...prev, reviewNotifications: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}