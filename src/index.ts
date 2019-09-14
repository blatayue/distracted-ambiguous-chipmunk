import { ApolloServer, gql } from "apollo-server-micro";
import { MongoDB, ProductT } from "./dataSources/Product";
import { connectDB } from "./mongooseConnect";

// test TypeDefs
const tempTypeDefs = gql`
	type Product {
		upc: String!
		name: String!
		tags: [String]
	}

	input IProduct {
		upc: String!
		name: String!
		tags: [String]
	}

	type Mutation {
		createProduct(product: IProduct): Product
		updateProduct(upc: String, updatedProduct: IProduct): Product
		deleteProduct(upc: String): Boolean
	}
	type Query {
		readProduct(upc: String!): Product
	}
	schema {
		query: Query
		mutation: Mutation
	}
`;

// resolvers
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

const apolloServer = new ApolloServer({
	resolvers: {
		Query,
		Mutation
	},
	playground: true,
	introspection: true,
	dataSources: () => ({
		// datasources like to not be agreeable with typescript, so most authors of them don't bother with typings...
		// Passing any here silences TSC - probably worth typing correctly in the future, but stable enough for now
		products: <any>new MongoDB()
	}),
	typeDefs: tempTypeDefs
});

// microservice requires connection to DB
connectDB()
	.then(() => {
		console.log("connected");
	})
	.catch(console.error);

export default apolloServer.createHandler();
