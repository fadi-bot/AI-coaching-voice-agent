import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const createDiscussionRoom = async (roomData) => {
  try {
    console.log('Creating discussion room with data:', JSON.stringify(roomData, null, 2));
    
    if (!supabase) {
      console.error('Supabase client is not initialized');
      throw new Error('Database connection error');
    }

    // Get the current session with more detailed logging
    console.log('Getting current session...');
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Session error:', sessionError);
      throw new Error('Error checking authentication status');
    }
    
    if (!session?.user) {
      console.log('No active session found - user not authenticated');
      throw new Error('You must be logged in to create a discussion room');
    }
    
    console.log('Authenticated user ID:', session.user.id);
    
    // Prepare the data to insert - only include fields that exist in the database
    const insertData = {
      status: 'active', // Only include fields that exist in your database
      // The database will automatically handle id, created_at, and updated_at
    };
    
    console.log('Inserting data into Supabase:', JSON.stringify(insertData, null, 2));
    
    // Perform the database insert with detailed error handling
    const { data, error, status, statusText } = await supabase
      .from('discussion_rooms')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('Supabase insertion error:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        table: error.table,
        status,
        statusText
      });
      
      // Check for common RLS policy violations
      if (error.code === '42501') {
        console.error('RLS Policy Violation - Check if the user has permission to insert into this table');
      }
      
      throw error;
    }
    
    console.log('Discussion room created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in createDiscussionRoom:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    throw error; // Re-throw to be handled by the caller
  }
};

export const getDiscussionRooms = async () => {
  const user = await getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('discussion_rooms')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const updateDiscussionRoom = async (roomId, updates) => {
  const user = await getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('discussion_rooms')
    .update(updates)
    .eq('id', roomId)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
export const getUserCredits = async () => {
  const user = await getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('users')
    .select('credits')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data?.credits || 0;
};

export const updateUserCredits = async (credits) => {
  const user = await getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('users')
    .update({ credits })
    .eq('id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
