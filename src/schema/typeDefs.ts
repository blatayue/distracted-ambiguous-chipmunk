import { gql } from "apollo-server-micro";

export const typeDefs = gql`
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
