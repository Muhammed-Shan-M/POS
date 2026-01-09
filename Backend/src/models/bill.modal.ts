import mongoose, { Schema, Document } from "mongoose";

interface IBillItem {
  productId: mongoose.Types.ObjectId;
  name: string;
  unitPrice: number;
  quantity: number;
  offerApplied?: string;
  discountAmount: number;
  finalPrice: number;
}

export interface IBill extends Document {
  items: IBillItem[];
  subtotal: number;
  totalDiscount: number;
  finalTotal: number;
  createdAt: Date;
}

const BillItemSchema = new Schema<IBillItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    unitPrice: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    offerApplied: {
      type: String
    },
    discountAmount: {
      type: Number,
      required: true
    },
    finalPrice: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);


const BillSchema = new Schema<IBill>(
  {
    items: {
      type: [BillItemSchema],
      required: true
    },
    subtotal: {
      type: Number,
      required: true
    },
    totalDiscount: {
      type: Number,
      required: true
    },
    finalTotal: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model<IBill>("Bill", BillSchema);
