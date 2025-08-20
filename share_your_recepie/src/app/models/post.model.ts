import { User } from "./user.model";

export interface Recipe {
id: any;
  _id: string;
  title: string;
  ingredients: string;
  instructions: string;
  imageUrl?: string;
  ownerId: string;
  likes: number;
  createdAt: Date;
}