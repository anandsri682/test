import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  navyColor: string;
  contactEmail: string;
  contactPhone: string;
  officeAddress: string;
  updatedAt: Date;
}

const SettingsSchema: Schema = new Schema({
  primaryColor: { type: String, default: '#087FF5' },
  secondaryColor: { type: String, default: '#13B89A' },
  accentColor: { type: String, default: '#FF6A00' },
  navyColor: { type: String, default: '#0B2A5B' },
  contactEmail: { type: String, default: 'AVMSmart.official@gmail.com' },
  contactPhone: { type: String, default: '8978040537' },
  officeAddress: { type: String, default: 'Innovation and Incubation Center, G Pulla Reddy Engineering College, Near Pasupula Village, Kurnool - Nandyal Main Road, Kurnool, Andhra Pradesh 518007, India' },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
