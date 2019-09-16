import { ProductT } from "../dataSources/Product";

const Query = {
	readProduct: async (
		parent: null,
		args: ProductT,
		context
	): Promise<ProductT> => {
		console.log(JSON.stringify(args));
		return await context.dataSources.products.readProduct(args.upc);
	}
};

type Mutation = {
	createProduct(
		parent: null,
		args: { product: ProductT },
		context
	): Promise<ProductT>;
	updateProduct(
		parent: null,
		args: { upc: string; updatedProduct: ProductT },
		context
	): Promise<ProductT>;
	deleteProduct(parent: null, args: { upc: string }, context): Promise<Boolean>;
};

const Mutation: Mutation = {
	createProduct: async (parent, args, context) =>
		await context.dataSources.products.createProduct(args),
	updateProduct: async (parent, args, context) =>
		await context.dataSources.products.updateProduct(args),
	deleteProduct: async (parent, args, context) =>
		await context.dataSources.products.deleteProduct(args)
};

export const resolvers = {
	Query,
	Mutation
};
