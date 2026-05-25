import mongoose, { Schema, model, models, type Document, type Model } from "mongoose";

export type AdminAction = "approve" | "reject" | "delete";

export interface IAdminLog extends Document {
  action: AdminAction;
  submissionId: mongoose.Types.ObjectId;
  submissionSlug: string;
  note?: string;
  createdAt: Date;
}

const adminLogSchema = new Schema<IAdminLog>(
  {
    action: {
      type: String,
      enum: ["approve", "reject", "delete"],
      required: true,
    },
    submissionId: {
      type: Schema.Types.ObjectId,
      ref: "Submission",
      required: true,
      index: true,
    },
    submissionSlug: { type: String, required: true },
    note: { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

adminLogSchema.index({ createdAt: -1 });

const AdminLogModel: Model<IAdminLog> =
  models.AdminLog ?? model<IAdminLog>("AdminLog", adminLogSchema);

export default AdminLogModel;
