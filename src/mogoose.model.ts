import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
	upc: String,
	name: String,
	tags: [String]
});

export const Product = model("Product", ProductSchema, "ProductStore");
