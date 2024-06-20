import { Schema, model, Document, Types } from 'mongoose';


interface IFlipper extends Document {
    name: string;
    price: number;
    condition: string;
    availability: string;
    brand: Types.ObjectId;
    releaseDate: Date;
    rating: number;
    mainImage: string;
    additionalImages: string[];
    additionalInfo?: string;
}

// Schema for the Flipper
const flipperSchema = new Schema<IFlipper>({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    condition: { type: String, required: true, trim: true },
    availability: { type: String, required: true, trim: true },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
    releaseDate: { type: Date, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    mainImage: { type: String, required: true },
    additionalImages: { type: [String], required: false },

});

// Create and export the model
const Flipper = model<IFlipper>('Flipper', flipperSchema);
export { Flipper, IFlipper };
