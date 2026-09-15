import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  company?: string;
  message?: string;
  status: 'New' | 'Contacted' | 'Converted' | 'Archived';
  createdAt: Date;
}

const ContactSchema: Schema = new Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  service: { type: String, required: true, trim: true, default: 'Web Development' },
  company: { type: String, trim: true, default: '' },
  message: { type: String, trim: true, default: '' },
  status: { type: String, enum: ['New', 'Contacted', 'Converted', 'Archived'], default: 'New' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
