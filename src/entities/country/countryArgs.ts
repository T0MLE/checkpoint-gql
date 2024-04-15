import { Field, Float, Int, ArgsType } from "type-graphql";

@ArgsType()
export class CountryArgs {
  @Field()
  name!: string;

  @Field()
  code!: string;

  @Field()
  continent!: string;
  
  @Field()
  emoji!: string
}
