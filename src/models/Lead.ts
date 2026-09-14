import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: 'New' | 'Contacted' | 'Converted' | 'Archived';
  createdAt: Date;
}

const LeadSchema: Schema = new Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, trim: true, default: '' },
  company: { type: String, trim: true, default: '' },
  service: { type: String, trim: true, default: 'General Inquiry' },
  budget: { type: String, trim: true, default: '' },
  timeline: { type: String, trim: true, default: '' },
  message: { type: String, required: true, trim: true },
  status: { type: String, enum: ['New', 'Contacted', 'Converted', 'Archived'], default: 'New' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
