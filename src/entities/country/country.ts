import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CountryArgs } from "./countryArgs";

@Entity()
@ObjectType()
 class Country extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id!: number;

    @Column()
    @Field()
    code!: string;

    @Column()
    @Field()
    continent!: string;

    @Column()
    @Field()
    name!: string;

    @Column()
    @Field()
    emoji!: string;

    constructor(country?: CountryArgs) {
        super();
    
        if (country) {
          this.code = country.code;
          this.continent = country.continent;
          this.name = country.name;
          this.emoji = country.emoji;
        }
    }

    static async getCountries(): Promise<Country[]> {
        return await Country.find();
      }

    static async getCountryByCode(code: string): Promise<Country> {
        const country = await Country.findOne({ where: { code } });
        if (!country) {
          throw new Error('Country not found');
        }
        return country;
    }

    static async getCountriesByContinent(continent: string): Promise<Country[]> {
        const countries = await Country.find({ where: { continent } });
        if (!countries) {
          throw new Error('Country not found');
        }
        return countries;
    }

    static async createCountry(country: CountryArgs): Promise<Country> {
      const newCountry = new Country(country);
      if (newCountry.name.length === 0 ) {
        throw new Error('Country name cannot be empty');
      }

      return await Country.save(newCountry);
    }
 }

 export default Country