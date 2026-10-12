import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  action:
    | 'status_change'
    | 'conversion_confirmed'
    | 'commission_calculated'
    | 'commission_payout'
    | 'lead_deleted'
    | 'partner_deactivated'
    | 'notification_retry'
    | 'payment_details_updated';
  adminEmail: string;
  targetType: 'Contact' | 'Commission' | 'Influencer';
  targetId: mongoose.Types.ObjectId;
  details?: Record<string, any>;
  createdAt: Date;
}

const AuditLogSchema: Schema = new Schema(
  {
    action: {
      type: String,
      required: true,
      index: true,
    },
    adminEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    targetType: {
      type: String,
      required: true,
      enum: ['Contact', 'Commission', 'Influencer'],
      index: true,
    },
    targetId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    details: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export default mongoose.models.AuditLog || mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
