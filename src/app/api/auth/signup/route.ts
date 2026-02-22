import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { hashPassword, createSession } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    console.log('🔵 Signup API called');
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { email, password, name, phone, isArtisan } = body;

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Password validation
    const hasMinLength = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    if (!hasMinLength || !hasLetter || !hasNumber) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Password must be at least 8 characters with at least one letter and one number' 
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('email')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (checkError) {
      console.error('❌ Database check error:', checkError);
      return NextResponse.json(
        { success: false, error: 'Database error checking email' },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const { data: user, error: createError } = await supabase
      .from('users')
      .insert([
        {
          email: normalizedEmail,
          password: hashedPassword,
          name,
          phone: phone || null,
          is_artisan: isArtisan || false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_active: true
        }
      ])
      .select()
      .single();

    if (createError) {
      console.error('❌ Create user error:', createError);
      
      if (createError.code === '23505') {
        return NextResponse.json(
          { success: false, error: 'Email already registered' },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { success: false, error: 'Failed to create account' },
        { status: 500 }
      );
    }

    console.log('✅ User created successfully:', user.id);

    // Create session (auto-login)
    const headersList = request.headers;
    const ipAddress = headersList.get('x-forwarded-for') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';

    const { token } = await createSession(user.id, ipAddress, userAgent);

    // Set cookie
    (await
      // Set cookie
      cookies()).set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    // Update last login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);

    // Return user data (excluding password)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: userWithoutPassword,
      redirect: '/dashboard' // Tell frontend where to redirect
    });

  } catch (error) {
    console.error('❌ Signup error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}