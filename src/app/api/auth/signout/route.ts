import { NextResponse } from 'next/server';
import { deleteSession } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const token = (await cookies()).get('session_token')?.value;

    if (token) {
      await deleteSession(token);
    }

    // Clear cookie
    (await
          // Clear cookie
          cookies()).delete('session_token');

    return NextResponse.json({
      success: true,
      message: 'Signed out successfully'
    });

  } catch (error) {
    console.error('Signout error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}