import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";

// Updated type definitions to include all nodes and relationships
const typeDefs = `#graphql
  type Movie {
    ids: String!
    title: String!
    description: String
    year: Int
    runtime: Int
    rating: Float
    votes: Int
    revenue: Float
    actorsIn: [Actor!]! @relationship(type: "ACTED_IN", direction: IN)
    directedBy: Director @relationship(type: "DIRECTED", direction: IN)
    genres: [Genre!]! @relationship(type: "IN", direction: OUT)
  }

  type Actor {
    name: String!
    moviesIn: [Movie!]! @relationship(type: "ACTED_IN", direction: OUT)
  }

  type Director {
    name: String!
    moviesDirected: [Movie!]! @relationship(type: "DIRECTED", direction: OUT)
  }

  type Genre {
    type: String!
    moviesIn: [Movie!]! @relationship(type: "IN", direction: IN)
  }
  

`;

// Create Neo4j driver instance
const driver = neo4j.driver(
  "neo4j+s://a5b23da9.databases.neo4j.io", // Replace with your Neo4j Aura URI if needed
  neo4j.auth.basic("neo4j", "NB0pO3ii3otVk_trXrTimRrCgC711Ow7xjhwp0DNoYo") // Replace with your username and password
);

// Create an instance of Neo4jGraphQL
const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

// Create Apollo Server instance with the generated schema
const server = new ApolloServer({
  schema: await neoSchema.getSchema(),
});

// Start the server
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ req }),
  listen: { port: 4000 },
});

console.log(`Server ready at ${url}`);
