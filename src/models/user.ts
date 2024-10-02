import { Schema, model } from 'mongoose';

interface IUser {
  name: string;
  age: number;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    zip: number;
  };
  favoriteNumbers: number[];
  contacts: {
    type: string;
    value: string;
  }[];
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: Number, required: true },
  },
  favoriteNumbers: { type: [Number], required: true },
  contacts: [
    {
      type: { type: String, required: true },
      value: { type: String, required: true }
    }
  ]
});

export const User = model<IUser>('User', UserSchema);
