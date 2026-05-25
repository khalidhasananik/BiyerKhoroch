import mongoose, { Schema, model, models, type Document, type Model } from "mongoose";

export interface ISubmission extends Document {
  slug: string;
  city: string;
  guestCount: number;
  venueName: string;
  photographyCompany?: string;
  costs: {
    venue: number;
    catering: number;
    photography: number;
    clothing: number;
    jewelry: number;
    decoration: number;
    makeup: number;
    gateDhora: number;
    miscellaneous: number;
  };
  totalCost: number;
  totalCostOverride?: number;
  story: string;
  status: "pending" | "approved" | "rejected";
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const costBreakdownSchema = new Schema(
  {
    venue:         { type: Number, default: 0, min: 0 },
    catering:      { type: Number, default: 0, min: 0 },
    photography:   { type: Number, default: 0, min: 0 },
    clothing:      { type: Number, default: 0, min: 0 },
    jewelry:       { type: Number, default: 0, min: 0 },
    decoration:    { type: Number, default: 0, min: 0 },
    makeup:        { type: Number, default: 0, min: 0 },
    gateDhora:     { type: Number, default: 0, min: 0 },
    miscellaneous: { type: Number, default: 0, min: 0 },
  },
  { _id: false }
);

function cityToSlugPart(city: string): string {
  return city
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

const submissionSchema = new Schema<ISubmission>(
  {
    slug: { type: String, unique: true, index: true },
    city: { type: String, required: true, index: true },
    guestCount: { type: Number, required: true, min: 1 },
    venueName: { type: String, required: true },
    photographyCompany: { type: String },
    costs: { type: costBreakdownSchema, required: true },
    totalCost: { type: Number, required: true, index: true },
    totalCostOverride: { type: Number },
    story: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    images: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

submissionSchema.pre("save", async function () {
  if (!this.slug) {
    const shortId = this._id.toString().slice(-6);
    this.slug = `${cityToSlugPart(this.city)}-wedding-${shortId}`;
  }
});

submissionSchema.index({ status: 1, createdAt: -1 });
submissionSchema.index({ status: 1, totalCost: -1 });
submissionSchema.index({ status: 1, city: 1 });

const SubmissionModel: Model<ISubmission> =
  models.Submission ?? model<ISubmission>("Submission", submissionSchema);

export default SubmissionModel;
