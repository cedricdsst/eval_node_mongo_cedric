import { Schema, model, Document } from 'mongoose';


interface IBrand extends Document {
    name: string;
    logo: string;
}


const brandSchema = new Schema<IBrand>({
    name: { type: String, required: true, unique: true, trim: true },
    logo: { type: String, required: false },
});


const Brand = model<IBrand>('Brand', brandSchema);
export { Brand, IBrand };
