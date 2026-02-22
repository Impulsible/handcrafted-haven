import { NextResponse } from 'next/server';
import { validateSession } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const token = (await cookies()).get('session_token')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false });
    }

    const session = await validateSession(token);

    if (!session) {
      (await cookies()).delete('session_token');
      return NextResponse.json({ authenticated: false });
    }

    // Extract user data from session
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = session.users;

    return NextResponse.json({
      authenticated: true,
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json(
      { authenticated: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}