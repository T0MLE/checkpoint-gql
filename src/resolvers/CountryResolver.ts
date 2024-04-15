import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import Country from "../entities/country/country";
import { CountryArgs } from "../entities/country/countryArgs";

@Resolver()
export class CountryResolver {
    @Mutation(() => Country)
    createCountry(@Args() args: CountryArgs) {
      return Country.createCountry({ ...args });
    }

    @Query(() => [Country])
    countries() {
        return Country.getCountries();
    }

    @Query(() => Country)
    country(@Arg("code", () => String) code: string) {
      return Country.getCountryByCode(code);
    }

    @Query(() => [Country])
    countriesByContinent(@Arg("continent", () => String) continent: string) {
      return Country.getCountriesByContinent(continent);
    }
}