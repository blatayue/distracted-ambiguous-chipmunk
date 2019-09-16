import { ApolloServer } from "apollo-server-micro";
import { MongoDBProductSource } from "./dataSources";
import { connectDB } from "./dataSources/mongooseConnect";
import { schema } from "./schema";

const apolloServer = new ApolloServer({
	schema,
	playground: true,
	introspection: true,
	dataSources: () => ({
		// datasources like to not be agreeable with typescript, so most authors of them don't bother with typings...
		// Passing any here silences TSC - probably worth typing correctly in the future, but stable enough for now
		products: <any>new MongoDBProductSource()
	})
});

// microservice requires connection to DB
connectDB()
	.then(() => {
		console.log("connected");
	})
	.catch(console.error);

export default apolloServer.createHandler();
