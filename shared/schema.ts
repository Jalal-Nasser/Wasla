import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Entities for the Mock Data Structure

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en").notNull(),
  price: integer("price").notNull(),
  currency: text("currency").default("SAR"),
  descriptionAr: text("description_ar"),
  descriptionEn: text("description_en"),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  stock: integer("stock").default(10),
  isDigital: boolean("is_digital").default(false),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en").notNull(),
  icon: text("icon"),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  total: integer("total").notNull(),
  status: text("status").notNull(), // pending, paid, shipped, delivered
  date: text("date").notNull(),
  items: jsonb("items").notNull(), // Array of product snapshots
});

export const tenants = pgTable("tenants", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  domain: text("domain").notNull(),
  plan: text("plan").default("basic"),
  status: text("status").default("active"),
});

// Zod Schemas
export const insertProductSchema = createInsertSchema(products);
export const insertCategorySchema = createInsertSchema(categories);
export const insertOrderSchema = createInsertSchema(orders);
export const insertTenantSchema = createInsertSchema(tenants);

export type Product = typeof products.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Tenant = typeof tenants.$inferSelect;
