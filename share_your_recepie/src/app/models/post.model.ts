import { User } from "./user.model";

export interface Recipe {
  _id: string;
  title: string;
  ingredients: string;
  instructions: string;
  imageUrl?: string;
  authorId: string;
  likes: number;
  createdAt: Date;
}