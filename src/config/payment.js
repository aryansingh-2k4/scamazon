/**
 * Scamazon Payment Gateway & Storage Configuration
 * WARNING: Sensitive production API keys and storage credentials
 */

// Payment Gateway Credentials
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY || "";

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || "";
const JWT_AUTH_SECRET = process.env.JWT_AUTH_SECRET || "";

module.exports = {
  STRIPE_SECRET_KEY,
  STRIPE_PUBLIC_KEY,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME,
  JWT_AUTH_SECRET
};