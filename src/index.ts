import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";
import { startStandaloneServer } from "@apollo/server/standalone";
import Country from "./entities/country/country";
import { CountryResolver } from "./resolvers/CountryResolver";

const startApolloServer = async () => {
    const dataSource = new DataSource({
        type: "sqlite",
        database: "db.sqlite",
        entities: [Country],
        synchronize: true,
      });

    await dataSource.initialize();

    const schema = await buildSchema({ resolvers: [CountryResolver] });

    const server = new ApolloServer({ schema });

    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
  };

  startApolloServer();

