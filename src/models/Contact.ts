import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  company?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  couponCode?: string;
  influencerId?: mongoose.Types.ObjectId;
  partnerType?: 'individual' | 'influencer';
  referrerDisplayName?: string;
  packagePrice?: number;
  discountAmount?: number;
  projectStatus?: 'Enquiry' | 'Project_Accepted' | 'In_Progress' | 'Completed' | 'Cancelled';
  paymentStatus?: 'Unpaid' | 'Partial' | 'Paid' | 'Refunded';
  status: 'New' | 'Contacted' | 'Converted' | 'Archived';
  createdAt: Date;
  updatedAt?: Date;
}

const ContactSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, required: true, trim: true },
    service: { type: String, required: true, trim: true, default: 'Web Development' },
    company: { type: String, trim: true, default: '' },
    budget: { type: String, trim: true, default: '' },
    timeline: { type: String, trim: true, default: '' },
    message: { type: String, trim: true, default: '' },
    couponCode: { type: String, trim: true, uppercase: true, index: true },
    influencerId: { type: Schema.Types.ObjectId, ref: 'Influencer', index: true },
    partnerType: { type: String, enum: ['individual', 'influencer'], default: 'individual' },
    referrerDisplayName: { type: String, trim: true, default: '' },
    packagePrice: { type: Number },
    discountAmount: { type: Number },
    projectStatus: {
      type: String,
      enum: ['Enquiry', 'Project_Accepted', 'In_Progress', 'Completed', 'Cancelled'],
      default: 'Enquiry',
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ['Unpaid', 'Partial', 'Paid', 'Refunded'],
      default: 'Unpaid',
      index: true,
    },
    status: { type: String, enum: ['New', 'Contacted', 'Converted', 'Archived'], default: 'New', index: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
