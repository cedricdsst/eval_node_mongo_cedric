import { Schema, model, Document } from 'mongoose';

// Interface for the Brand
interface IBrand extends Document {
    name: string;
    logo: string; // URL or path to the brand logo
}

// Schema for the Brand
const brandSchema = new Schema<IBrand>({
    name: { type: String, required: true, unique: true, trim: true },
    logo: { type: String, required: false }, // Logo can be optional
});

// Create and export the model
const Brand = model<IBrand>('Brand', brandSchema);
export { Brand, IBrand };
