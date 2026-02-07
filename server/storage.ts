import { db } from "./db";
import {
  products,
  type Product,
} from "@shared/schema";

export interface IStorage {
  // Minimal interface to satisfy server build
  // Frontend will use mock data
  getProducts(): Promise<Product[]>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }
}

export const storage = new DatabaseStorage();
