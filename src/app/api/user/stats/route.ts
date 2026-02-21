/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      );
    }

    // Get orders count
    const { count: ordersCount, error: ordersError } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get wishlist count (assuming you have a wishlist table)
    const { count: wishlistCount, error: wishlistError } = await supabase
      .from('wishlist')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get reviews count
    const { count: reviewsCount, error: reviewsError } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get artisan products count (if user is artisan)
    const { count: artisanProductsCount, error: artisanError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('artisan_id', userId);

    return NextResponse.json({
      success: true,
      stats: {
        orders: ordersCount || 0,
        wishlistItems: wishlistCount || 0,
        reviews: reviewsCount || 0,
        artisanProducts: artisanProductsCount || 0
      }
    });

  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}