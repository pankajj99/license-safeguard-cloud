
import { supabase } from '@/lib/supabase';
import { Notification } from '@/types/database.types';

// Get notifications for the current user
export const getUserNotifications = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('time', { ascending: false });

  if (error) throw error;
  return data;
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId);

  if (error) throw error;
  return data;
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('user_id', user.id)
    .eq('read', false);

  if (error) throw error;
  return data;
};
