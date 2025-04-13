
export interface License {
  id: string;
  name: string;
  description: string;
  type: string;
  status: 'active' | 'expired' | 'renewing';
  expiry_date: string;
  purchase_date: string;
  last_renewal_date: string | null;
  product_key: string;
  total_seats: number;
  used_seats: number;
  features: string[];
  client_id: string;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  user_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface LicenseUser {
  id: string;
  license_id: string;
  user_email: string;
  user_name: string;
  status: 'active' | 'inactive' | 'pending';
  date_added: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  license_id: string;
  file_path: string;
}

export interface Notification {
  id: string;
  type: 'expiry' | 'compliance' | 'request' | 'system';
  message: string;
  time: string;
  read: boolean;
  user_id: string;
  license_id: string | null;
}

export interface LicenseHistory {
  id: string;
  license_id: string;
  action: string;
  date: string;
  user: string;
}
