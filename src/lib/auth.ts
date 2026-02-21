/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { supabase } from './supabase';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const generateToken = (): string => {
  return randomBytes(32).toString('hex');
};

export const createSession = async (userId: string, ipAddress?: string, userAgent?: string) => {
  const token = generateToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

  const { data, error } = await supabase
    .from('user_sessions')
    .insert([
      {
        user_id: userId,
        token,
        expires_at: expiresAt.toISOString(),
        ip_address: ipAddress,
        user_agent: userAgent,
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return { token, expiresAt };
};

export const validateSession = async (token: string) => {
  const { data: session, error } = await supabase
    .from('user_sessions')
    .select(`
      *,
      users:user_id (*)
    `)
    .eq('token', token)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error || !session) return null;
  
  // Update last login
  await supabase
    .from('users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', session.user_id);

  return session;
};

export const deleteSession = async (token: string) => {
  const { error } = await supabase
    .from('user_sessions')
    .delete()
    .eq('token', token);

  return !error;
};

export const deleteAllUserSessions = async (userId: string, excludeToken?: string) => {
  let query = supabase
    .from('user_sessions')
    .delete()
    .eq('user_id', userId);

  if (excludeToken) {
    query = query.neq('token', excludeToken);
  }

  const { error } = await query;
  return !error;
};