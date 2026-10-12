import mongoose, { Schema, Document } from 'mongoose';

export interface ISocialAccount {
  platform: string; // e.g., 'Instagram', 'YouTube', 'Facebook', 'LinkedIn', 'Twitter', 'Other'
  url: string;
}

export interface IInfluencer extends Document {
  fullName: string;
  email: string; // normalized lowercase
  phone: string;
  partnerType: 'individual' | 'influencer';
  influencerName?: string; // account/display name for influencers (e.g. "Tech With Rahul")
  socialAccounts?: ISocialAccount[];
  platform?: string; // backward compatibility
  socialProfileUrl?: string; // backward compatibility
  followerCount?: string;
  category?: string;
  message?: string;
  termsAccepted: boolean;
  termsAcceptedAt?: Date;
  termsVersion?: string;
  status: 'approved' | 'pending' | 'rejected' | 'deactivated' | 'archived';
  paymentMethod?: 'upi' | 'mobile_upi' | 'bank_transfer' | 'none';
  paymentRecipientName?: string;
  upiId?: string;
  upiMobile?: string;
  bankDetails?: {
    accountHolderName?: string;
    bankName?: string;
    accountNumber?: string;
    ifscCode?: string;
  };
  paymentDetailsUpdatedAt?: Date;
  paymentVerificationStatus?: 'unverified' | 'verified' | 'rejected';
  couponCode: string; // exactly 6 alphanumeric uppercase characters
  couponActive: boolean;
  couponCreatedAt?: Date;
  couponExpiresAt?: Date;
  emailDeliveryStatus: 'sent' | 'failed' | 'pending';
  emailDeliveryError?: string;
  emailSentAt?: Date;
  internalNotes?: string;
  approvedBy?: string;
  approvedAt?: Date;
  archivedAt?: Date;
  archivedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SocialAccountSchema = new Schema(
  {
    platform: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const InfluencerSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    phone: { type: String, required: true, trim: true, index: true },
    partnerType: {
      type: String,
      enum: ['individual', 'influencer'],
      default: 'individual',
      index: true,
    },
    influencerName: { type: String, trim: true, default: '' },
    socialAccounts: { type: [SocialAccountSchema], default: [] },
    platform: { type: String, trim: true, default: '' },
    socialProfileUrl: { type: String, trim: true, default: '' },
    followerCount: { type: String, trim: true, default: '' },
    category: { type: String, trim: true, default: '' },
    message: { type: String, trim: true, default: '' },
    termsAccepted: { type: Boolean, required: true, default: false },
    termsAcceptedAt: { type: Date, default: Date.now },
    termsVersion: { type: String, default: '1.0' },
    status: {
      type: String,
      enum: ['approved', 'pending', 'rejected', 'deactivated', 'archived'],
      default: 'approved',
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ['upi', 'mobile_upi', 'bank_transfer', 'none'],
      default: 'none',
    },
    paymentRecipientName: { type: String, trim: true, default: '' },
    upiId: { type: String, trim: true, default: '' },
    upiMobile: { type: String, trim: true, default: '' },
    bankDetails: {
      accountHolderName: { type: String, trim: true, default: '' },
      bankName: { type: String, trim: true, default: '' },
      accountNumber: { type: String, trim: true, default: '' },
      ifscCode: { type: String, trim: true, uppercase: true, default: '' },
    },
    paymentDetailsUpdatedAt: { type: Date },
    paymentVerificationStatus: {
      type: String,
      enum: ['unverified', 'verified', 'rejected'],
      default: 'unverified',
    },
    couponCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      minlength: 6,
      maxlength: 6,
      index: true,
    },
    couponActive: { type: Boolean, default: true, index: true },
    couponCreatedAt: { type: Date, default: Date.now },
    couponExpiresAt: { type: Date },
    emailDeliveryStatus: {
      type: String,
      enum: ['sent', 'failed', 'pending'],
      default: 'pending',
      index: true,
    },
    emailDeliveryError: { type: String, default: '' },
    emailSentAt: { type: Date },
    internalNotes: { type: String, default: '' },
    approvedBy: { type: String, default: 'system-auto' },
    approvedAt: { type: Date, default: Date.now },
    archivedAt: { type: Date },
    archivedBy: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation in Next.js development
export default mongoose.models.Influencer || mongoose.model<IInfluencer>('Influencer', InfluencerSchema);
