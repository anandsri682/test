import crypto from 'crypto';

/**
 * Derives a 32-byte AES key from environment variables.
 * Uses PAYMENT_ENCRYPTION_KEY, JWT_SECRET, or a deterministic fallback.
 */
function getEncryptionKey(): Buffer {
  const secret = process.env.PAYMENT_ENCRYPTION_KEY || process.env.JWT_SECRET || 'avm-smart-payment-secret-2024';
  return crypto.createHash('sha256').update(secret).digest();
}

/**
 * Encrypts sensitive financial data (e.g., bank account number) using AES-256-GCM.
 * Format: iv:authTag:ciphertext (hex-encoded)
 */
export function encryptSensitiveData(plainText: string): string {
  if (!plainText || !plainText.trim()) return '';

  const key = getEncryptionKey();
  const iv = crypto.randomBytes(12); // 12-byte IV for GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  let encrypted = cipher.update(plainText.trim(), 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag().toString('hex');

  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

/**
 * Decrypts AES-256-GCM encrypted financial data.
 * Safely returns masked value if decryption fails or format is invalid.
 */
export function decryptSensitiveData(encryptedData: string): string {
  if (!encryptedData || !encryptedData.trim()) return '';

  // If data is already plain text or not in iv:authTag:ciphertext format
  const parts = encryptedData.split(':');
  if (parts.length !== 3) {
    return encryptedData;
  }

  try {
    const [ivHex, authTagHex, cipherHex] = parts;
    const key = getEncryptionKey();
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(cipherHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.error('[Decryption Error]: Failed to decrypt sensitive data');
    return '••••••••';
  }
}

/**
 * Returns a masked representation of sensitive strings (e.g., ••••••••1234).
 */
export function maskAccountNumber(accountNumber: string): string {
  if (!accountNumber || !accountNumber.trim()) return '••••••••';

  // If it's an encrypted string, try decrypting first to get the last 4 digits
  let plain = accountNumber;
  if (accountNumber.includes(':') && accountNumber.split(':').length === 3) {
    plain = decryptSensitiveData(accountNumber);
  }

  const clean = plain.trim();
  if (clean.length <= 4) return '••••';
  return `••••••••${clean.slice(-4)}`;
}
