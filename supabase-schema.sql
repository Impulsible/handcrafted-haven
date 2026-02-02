-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  full_name VARCHAR(100),
  avatar_url TEXT,
  phone VARCHAR(20),
  address JSONB DEFAULT '{}',
  date_of_birth DATE,
  bio TEXT,
  is_artisan BOOLEAN DEFAULT false,
  artisan_details JSONB DEFAULT '{}',
  email_verified BOOLEAN DEFAULT false,
  phone_verified BOOLEAN DEFAULT false,
  two_factor_enabled BOOLEAN DEFAULT false,
  last_login TIMESTAMP WITH TIME ZONE,
  login_count INTEGER DEFAULT 0,
  failed_login_attempts INTEGER DEFAULT 0,
  account_locked_until TIMESTAMP WITH TIME ZONE,
  preferences JSONB DEFAULT '{"email_notifications": true, "sms_notifications": false, "theme": "light"}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT username_length CHECK (char_length(username) >= 3),
  CONSTRAINT phone_format CHECK (phone ~ '^\+?[1-9]\d{1,14}$')
);

-- Password requirements table
CREATE TABLE IF NOT EXISTS public.password_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_user_id (user_id)
);

-- Products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  artisan_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  subcategory VARCHAR(50),
  tags TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  stock_quantity INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  materials TEXT[] DEFAULT '{}',
  dimensions JSONB DEFAULT '{}',
  weight DECIMAL(8,2),
  shipping_details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT positive_price CHECK (price > 0),
  CONSTRAINT non_negative_stock CHECK (stock_quantity >= 0),
  CONSTRAINT valid_rating CHECK (rating >= 0 AND rating <= 5)
);

-- Cart table
CREATE TABLE IF NOT EXISTS public.cart (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  product_id UUID REFERENCES public.products ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, product_id),
  CONSTRAINT positive_quantity CHECK (quantity > 0)
);

-- Wishlist table
CREATE TABLE IF NOT EXISTS public.wishlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  product_id UUID REFERENCES public.products ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, product_id)
);

-- Orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_number VARCHAR(20) UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  final_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method VARCHAR(50),
  payment_intent_id VARCHAR(100),
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  notes TEXT,
  estimated_delivery DATE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES public.orders ON DELETE CASCADE,
  product_id UUID REFERENCES public.products ON DELETE CASCADE,
  product_name VARCHAR(200) NOT NULL,
  product_price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL,
  subtotal DECIMAL(10,2) GENERATED ALWAYS AS (product_price * quantity) STORED,
  
  CONSTRAINT positive_order_quantity CHECK (quantity > 0)
);

-- Reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  product_id UUID REFERENCES public.products ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(200),
  comment TEXT,
  images TEXT[] DEFAULT '{}',
  is_verified_purchase BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  reported_count INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, product_id, order_id)
);

-- Search history table
CREATE TABLE IF NOT EXISTS public.search_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  query TEXT NOT NULL,
  filters JSONB DEFAULT '{}',
  result_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_user_query (user_id, query)
);

-- Password policy function
CREATE OR REPLACE FUNCTION public.validate_password_strength(password TEXT)
RETURNS TABLE (
  is_valid BOOLEAN,
  message TEXT
) AS Green
BEGIN
  -- Check minimum length
  IF length(password) < 8 THEN
    RETURN QUERY SELECT false, 'Password must be at least 8 characters long';
    RETURN;
  END IF;

  -- Check for uppercase letter
  IF password !~ '[A-Z]' THEN
    RETURN QUERY SELECT false, 'Password must contain at least one uppercase letter';
    RETURN;
  END IF;

  -- Check for lowercase letter
  IF password !~ '[a-z]' THEN
    RETURN QUERY SELECT false, 'Password must contain at least one lowercase letter';
    RETURN;
  END IF;

  -- Check for number
  IF password !~ '[0-9]' THEN
    RETURN QUERY SELECT false, 'Password must contain at least one number';
    RETURN;
  END IF;

  -- Check for special character
  IF password !~ '[!@#$%^&*(),.?":{}|<>]' THEN
    RETURN QUERY SELECT false, 'Password must contain at least one special character';
    RETURN;
  END IF;

  -- Check for common passwords (simplified)
  IF password IN ('password', '12345678', 'qwerty123', 'letmein', 'welcome') THEN
    RETURN QUERY SELECT false, 'Password is too common. Please choose a stronger password';
    RETURN;
  END IF;

  RETURN QUERY SELECT true, 'Password meets all requirements';
END;
Green LANGUAGE plpgsql;

-- Trigger function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS Green
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
Green LANGUAGE plpgsql;

-- Apply triggers to tables
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_updated_at
  BEFORE UPDATE ON public.cart
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.password_history ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Products policies
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Artisans can manage their products" ON public.products
  FOR ALL USING (artisan_id = auth.uid());

-- Cart policies
CREATE POLICY "Users can manage own cart" ON public.cart
  FOR ALL USING (auth.uid() = user_id);

-- Wishlist policies
CREATE POLICY "Users can manage own wishlist" ON public.wishlist
  FOR ALL USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Anyone can view approved reviews" ON public.reviews
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Users can create reviews for purchased products" ON public.reviews
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.order_items oi
      JOIN public.orders o ON oi.order_id = o.id
      WHERE o.user_id = auth.uid()
      AND oi.product_id = product_id
      AND o.status = 'delivered'
    )
  );

CREATE POLICY "Users can update own reviews" ON public.reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- Search history policies
CREATE POLICY "Users can manage own search history" ON public.search_history
  FOR ALL USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_price ON public.products(price);
CREATE INDEX idx_products_artisan ON public.products(artisan_id);
CREATE INDEX idx_orders_user_status ON public.orders(user_id, status);
CREATE INDEX idx_cart_user_product ON public.cart(user_id, product_id);
CREATE INDEX idx_wishlist_user_product ON public.wishlist(user_id, product_id);
CREATE INDEX idx_reviews_product_rating ON public.reviews(product_id, rating);
CREATE INDEX idx_users_username ON public.users(username);
CREATE INDEX idx_users_email_verified ON public.users(email_verified);

-- Enable realtime for certain tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
