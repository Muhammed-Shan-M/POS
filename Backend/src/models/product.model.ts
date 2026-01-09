import mongoose, { Schema, Document } from "mongoose";


export interface IOffer {
  type: "BOGO" | "PERCENTAGE";
  value: number;        
  minQty: number;       
  priority: number;     
  active: boolean;
}

export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
  active: boolean;
  offers: IOffer[];
}


const OfferSchema = new Schema<IOffer>(
  {
    type: {
      type: String,
      enum: ["BOGO", "PERCENTAGE"],
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    minQty: {
      type: Number,
      required: true
    },
    priority: {
      type: Number,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  { _id: false }
);


const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String
    },
    active: {
      type: Boolean,
      default: true
    },
    offers: {
      type: [OfferSchema],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
