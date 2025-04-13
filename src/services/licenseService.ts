
import { supabase } from '@/lib/supabase';
import { License } from '@/types/database.types';

// Get all licenses for a client user
export const getClientLicenses = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('licenses')
    .select('*, clients!inner(*)')
    .eq('clients.user_id', user.id);

  if (error) throw error;
  return data;
};

// Get license by ID
export const getLicenseById = async (licenseId: string) => {
  const { data, error } = await supabase
    .from('licenses')
    .select('*')
    .eq('id', licenseId)
    .single();

  if (error) throw error;
  return data;
};

// Get license users
export const getLicenseUsers = async (licenseId: string) => {
  const { data, error } = await supabase
    .from('license_users')
    .select('*')
    .eq('license_id', licenseId);

  if (error) throw error;
  return data;
};

// Get license documents
export const getLicenseDocuments = async (licenseId: string) => {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('license_id', licenseId);

  if (error) throw error;
  return data;
};

// Get license history
export const getLicenseHistory = async (licenseId: string) => {
  const { data, error } = await supabase
    .from('license_history')
    .select('*')
    .eq('license_id', licenseId)
    .order('date', { ascending: false });

  if (error) throw error;
  return data;
};

// Request license renewal
export const requestLicenseRenewal = async (licenseId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Not authenticated');

  // Update license status
  const { error: updateError } = await supabase
    .from('licenses')
    .update({ status: 'renewing' })
    .eq('id', licenseId);

  if (updateError) throw updateError;

  // Add to license history
  const { error: historyError } = await supabase
    .from('license_history')
    .insert({
      license_id: licenseId,
      action: 'Renewal requested',
      date: new Date().toISOString(),
      user: user.email
    });

  if (historyError) throw historyError;

  return { success: true };
};

// Request additional seats
export const requestAdditionalSeats = async (licenseId: string, additionalSeats: number) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Not authenticated');

  // Get current license
  const { data: license, error: licenseError } = await supabase
    .from('licenses')
    .select('total_seats')
    .eq('id', licenseId)
    .single();

  if (licenseError) throw licenseError;

  // Update seats
  const newTotalSeats = license.total_seats + additionalSeats;
  const { error: updateError } = await supabase
    .from('licenses')
    .update({ total_seats: newTotalSeats })
    .eq('id', licenseId);

  if (updateError) throw updateError;

  // Add to license history
  const { error: historyError } = await supabase
    .from('license_history')
    .insert({
      license_id: licenseId,
      action: `${additionalSeats} seats added`,
      date: new Date().toISOString(),
      user: user.email
    });

  if (historyError) throw historyError;

  return { success: true, newTotal: newTotalSeats };
};
