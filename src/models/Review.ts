import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  name: string;
  role: string;
  company?: string;
  quote: string;
  rating: number;
  approved: boolean;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true, default: 'Client' },
  company: { type: String, trim: true, default: 'Digital Project' },
  quote: { type: String, required: true, trim: true },
  rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
  approved: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
