/**
 * OpenEMR User Information
 */
export interface UserInfo {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  permissions: string[];
  created_at: string;
  updated_at: string;
}
