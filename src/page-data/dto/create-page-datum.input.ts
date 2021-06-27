import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePageDatumInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
