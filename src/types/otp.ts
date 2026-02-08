export interface OtpVerification {
  id: number;
  user_id: number;
  otp_hash: string;
  expires_at: Date;
  attempts: number;
  created_at: Date;
}
