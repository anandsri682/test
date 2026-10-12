import mongoose, { Schema, Document } from 'mongoose';

export interface ICommission extends Document {
  influencerId: mongoose.Types.ObjectId;
  couponCode: string;
  leadId: mongoose.Types.ObjectId;
  customerName: string;
  customerEmail: string;
  packagePrice: number; // e.g. 3999
  discountAmount: number; // e.g. 1000
  commissionRateType: 'fixed' | 'percentage';
  commissionAmount: number; // e.g. 500 (or configured value)
  status: 'pending' | 'eligible' | 'approved' | 'paid' | 'cancelled';
  projectTakeoverStatus: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  paymentReceived: boolean;
  paymentReference?: string;
  paidAt?: Date;
  paidBy?: string;
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
    commissionRateType: { type: String, enum: ['fixed', 'percentage'], default: 'fixed' },
    commissionAmount: { type: Number, default: 500 }, // Configurable default ₹500 per website package
    status: {
      type: String,
      enum: ['pending', 'eligible', 'approved', 'paid', 'cancelled'],
      default: 'pending',
      index: true,
    },
    projectTakeoverStatus: {
      type: String,
      enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'],
      default: 'pending',
      index: true,
    },
    paymentReceived: { type: Boolean, default: false },
    paymentReference: { type: String, trim: true, default: '' },
    paidAt: { type: Date },
    paidBy: { type: String, trim: true, default: '' },
    adminNotes: { type: String, trim: true, default: '' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Commission || mongoose.model<ICommission>('Commission', CommissionSchema);
