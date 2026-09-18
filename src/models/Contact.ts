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
    status: { type: String, enum: ['New', 'Contacted', 'Converted', 'Archived'], default: 'New', index: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
