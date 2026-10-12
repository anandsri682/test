import Influencer from '@/models/Influencer';

/**
 * Derives a strictly 6-character uppercase alphanumeric coupon code from a source name.
 * 
 * Rules:
 * 1. Normalize source: uppercase, strip all non-alphanumeric characters.
 * 2. If length >= 6, candidate starts with the first 6 chars (e.g., "Rahul Kumar" -> "RAHULK", "Tech With Rahul" -> "TECHWI").
 * 3. If length < 6, pad deterministically with numbers/letters to reach exactly 6 chars (e.g. "PRIYA" -> "PRIYA7", "AVM" -> "AVM888").
 * 4. Checks uniqueness against database.
 * 5. If collision occurs, generates subsequent candidate variations of EXACTLY 6 characters,
 *    retaining relationship with the source name (e.g., first 4-5 chars + numbers/random alphanumeric).
 */
export async function generateSixCharCouponCode(sourceName: string): Promise<string> {
  const clean = sourceName.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  const base = clean.length > 0 ? clean : 'AVM';

  const candidates: string[] = [];

  // Strategy 1: Exact first 6 characters if available
  if (base.length >= 6) {
    candidates.push(base.slice(0, 6));
    // Alternate 6-char truncation if name had multiple words (e.g., first 5 + '1', first 4 + '99', first 5 + 'X')
    candidates.push(`${base.slice(0, 5)}1`);
    candidates.push(`${base.slice(0, 5)}2`);
    candidates.push(`${base.slice(0, 5)}8`);
    candidates.push(`${base.slice(0, 4)}99`);
    candidates.push(`${base.slice(0, 4)}77`);
    candidates.push(`${base.slice(0, 5)}X`);
    candidates.push(`${base.slice(0, 5)}V`);
  } else {
    // Length < 6: deterministic padding to reach exactly 6 characters
    const padChars = ['7', '8', '9', '1', '2', 'A', 'S', 'M', 'X', 'Z'];
    let padded = base;
    let padIdx = 0;
    while (padded.length < 6) {
      padded += padChars[padIdx % padChars.length];
      padIdx++;
    }
    candidates.push(padded.slice(0, 6));

    // Alternative variations of exactly 6 characters
    candidates.push(`${base.padEnd(5, '8')}1`.slice(0, 6));
    candidates.push(`${base.padEnd(5, '9')}2`.slice(0, 6));
    candidates.push(`${base.padEnd(4, '0')}77`.slice(0, 6));
  }

  // Check candidates against database
  for (const candidate of candidates) {
    if (candidate.length === 6) {
      const exists = await Influencer.findOne({ couponCode: candidate });
      if (!exists) {
        return candidate;
      }
    }
  }

  // If initial deterministic candidates collide, generate using prefix + random digits, guaranteeing exactly 6 chars
  const prefixLength = Math.min(Math.max(base.length, 2), 4);
  const prefix = base.slice(0, prefixLength);
  const neededRandomDigits = 6 - prefix.length;

  for (let attempt = 0; attempt < 50; attempt++) {
    const min = Math.pow(10, neededRandomDigits - 1);
    const max = Math.pow(10, neededRandomDigits) - 1;
    const randomNum = Math.floor(min + Math.random() * (max - min + 1));
    const candidate = `${prefix}${randomNum}`;

    if (candidate.length === 6) {
      const exists = await Influencer.findOne({ couponCode: candidate });
      if (!exists) {
        return candidate;
      }
    }
  }

  // Fallback: AVM + 3 digits (e.g. AVM729), exactly 6 chars
  for (let attempt = 0; attempt < 50; attempt++) {
    const rand = Math.floor(100 + Math.random() * 900);
    const candidate = `AVM${rand}`;
    const exists = await Influencer.findOne({ couponCode: candidate });
    if (!exists) {
      return candidate;
    }
  }

  // Final timestamp-based fallback (last 6 digits), strictly 6 chars
  return Date.now().toString().slice(-6);
}
