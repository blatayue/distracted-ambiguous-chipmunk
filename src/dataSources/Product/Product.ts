import { MongoDataSource } from "apollo-datasource-mongo";
import { Product } from "./";
import { Model, Document } from "mongoose";

export class MongoDBProductSource extends MongoDataSource {
	constructor() {
		super();
		this.collections = [Product];
	}
	// Array of mongoose models with auto type sig
	collections: Model<Document, {}>[];

	async createProduct(args: { product: ProductT }) {
		// // verify connection
		// await connectDB();

		// create mongoose model
		const newProd = new Product({ ...args.product });

		// save it do DB logging success or err
		await newProd.save((err, prod: any) => {
			if (err) return console.error(err);
			console.log("saved document");
		});

		// opportunistic response assuming db save will succeed
		return newProd.toObject();
	}

	readProduct = async (upc: string) => await Product.findOne({ upc });

	async updateProduct({ upc, updatedProduct }) {
		// make the changes
		await Product.findOneAndUpdate({ upc }, { ...updatedProduct });

		// verify they're in the db before returning changes
		const findUpdated = await Product.findOne({ upc: updatedProduct.upc });

		// hopefully not an error...
		return await findUpdated.toObject();
	}
	deleteProduct = async ({ upc }) => {
		try {
			await Product.findOneAndDelete({ upc });
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	};
}

export type ProductT = {
	upc: string;
	name: string;
	tags?: string[];
};
