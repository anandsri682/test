import mongoose, { Schema, Document } from 'mongoose';

export interface ICommission extends Document {
  influencerId: mongoose.Types.ObjectId;
  couponCode: string;
  leadId: mongoose.Types.ObjectId;
  customerName: string;
  customerEmail: string;
  packagePrice?: number; // legacy default package price
  discountAmount?: number;
  finalProjectAmount?: number; // actual confirmed qualifying project amount (INR)
  commissionRate: number; // 10%
  commissionAmount: number; // calculated 10% of finalProjectAmount
  status:
    | 'pending'
    | 'pending_qualification'
    | 'eligible'
    | 'pending_payment'
    | 'approved'
    | 'paid'
    | 'cancelled'
    | 'reversed';
  projectTakeoverStatus?: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  customerPaymentConfirmed?: boolean;
  projectTakeoverConfirmed?: boolean;
  paymentReceived: boolean;
  payoutMethod?: 'upi' | 'mobile_upi' | 'bank_transfer' | 'manual';
  paymentReference?: string;
  payoutTransactionRef?: string;
  paidAt?: Date;
  paidBy?: string;
  confirmedBy?: string;
  confirmedAt?: Date;
  idempotencyKey?: string;
  notificationStatus: 'pending' | 'sent' | 'failed' | 'not_required';
  notificationSentAt?: Date;
  notificationError?: string;
  notificationAttemptCount: number;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommissionSchema: Schema = new Schema(
  {
    influencerId: { type: Schema.Types.ObjectId, ref: 'Influencer', required: true, index: true },
    couponCode: { type: String, required: true, uppercase: true, trim: true, index: true },
    leadId: { type: Schema.Types.ObjectId, ref: 'Contact', required: true, unique: true, index: true },
    customerName: { type: String, required: true, trim: true },
    customerEmail: { type: String, required: true, trim: true, lowercase: true },
    packagePrice: { type: Number, default: 3999 },
    discountAmount: { type: Number, default: 1000 },
    finalProjectAmount: { type: Number },
    commissionRate: { type: Number, default: 10 },
    commissionAmount: { type: Number, required: true, default: 0 },
    status: {
      type: String,
      enum: [
        'pending',
        'pending_qualification',
        'eligible',
        'pending_payment',
        'approved',
        'paid',
        'cancelled',
        'reversed',
      ],
      default: 'pending_qualification',
      index: true,
    },
    projectTakeoverStatus: {
      type: String,
      enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'],
      default: 'pending',
      index: true,
    },
    customerPaymentConfirmed: { type: Boolean, default: false },
    projectTakeoverConfirmed: { type: Boolean, default: false },
    paymentReceived: { type: Boolean, default: false },
    payoutMethod: {
      type: String,
      enum: ['upi', 'mobile_upi', 'bank_transfer', 'manual'],
      default: 'manual',
    },
    paymentReference: { type: String, trim: true, default: '' },
    payoutTransactionRef: { type: String, trim: true, default: '' },
    paidAt: { type: Date },
    paidBy: { type: String, trim: true, default: '' },
    confirmedBy: { type: String, trim: true, default: '' },
    confirmedAt: { type: Date },
    idempotencyKey: { type: String, unique: true, sparse: true, index: true },
    notificationStatus: {
      type: String,
      enum: ['pending', 'sent', 'failed', 'not_required'],
      default: 'pending',
      index: true,
    },
    notificationSentAt: { type: Date },
    notificationError: { type: String, default: '' },
    notificationAttemptCount: { type: Number, default: 0 },
    adminNotes: { type: String, trim: true, default: '' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Commission || mongoose.model<ICommission>('Commission', CommissionSchema);
