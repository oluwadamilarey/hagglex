import { CreatePageDatumInput } from './create-page-datum.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePageDatumInput extends PartialType(CreatePageDatumInput) {
  @Field(() => Int)
  id: number;
}
