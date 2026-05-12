import mongoose, { Document, Schema } from "mongoose";

export interface IDevOpsMilestone extends Document {
  title: string;
  category: string;
  summary: string;
  status: "Planned" | "Learning" | "Practicing" | "Confident";
  order: number;
  color?: string;
  docsLink?: string;
  proofLink?: string;
  featured: boolean;
  createdAt: Date;
}

const DevOpsMilestoneSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    summary: { type: String, required: true },
    status: {
      type: String,
      enum: ["Planned", "Learning", "Practicing", "Confident"],
      default: "Learning",
    },
    order: { type: Number, required: true, default: 1 },
    color: { type: String },
    docsLink: { type: String },
    proofLink: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const DevOpsMilestone =
  mongoose.models.DevOpsMilestone ||
  mongoose.model<IDevOpsMilestone>("DevOpsMilestone", DevOpsMilestoneSchema);

export default DevOpsMilestone;
