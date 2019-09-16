import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { makeExecutableSchema } from "apollo-server-micro";
export const schema = makeExecutableSchema({ typeDefs, resolvers });
