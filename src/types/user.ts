export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  is_2fa_enabled: boolean;
  created_at: Date;
}
