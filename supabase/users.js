import { supabase } from '@/lib/supabaseClient';

export async function createOrGetUser(userData) {
  const { email, name } = userData;

  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    throw fetchError;
  }

  if (existingUser) {
    return existingUser;
  }

  const newUser = {
    email,
    name,
    credits: 50000,
    created_at: new Date().toISOString()
  };

  const { data: createdUser, error: createError } = await supabase
    .from('users')
    .insert([newUser])
    .select()
    .single();

  if (createError) {
    throw createError;
  }

  return createdUser;
}

export async function updateUserCredits(userId, credits) {
  const { data, error } = await supabase
    .from('users')
    .update({ credits })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserById(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}
