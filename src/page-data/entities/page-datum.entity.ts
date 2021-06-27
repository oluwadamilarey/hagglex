import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PageDatum {
  @Field({ nullable: true })
  PageTitle: string;

  @Field({ nullable: true })
  Description: string;

  @Field({ nullable: true })
  LargestImage: string;
}
