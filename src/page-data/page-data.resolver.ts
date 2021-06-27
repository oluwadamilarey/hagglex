import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PageDataService } from './page-data.service';
import { PageDatum } from './entities/page-datum.entity';

@Resolver(() => PageDatum)
export class PageDataResolver {
  constructor(private readonly pageDataService: PageDataService) {}

  @Query((returns) => PageDatum)
  getPage(): Promise<PageDatum> {
    return this.pageDataService.getPage();
  }

  @Query((returns) => PageDatum)
  getPageInfo(@Args('url') url: string): Promise<PageDatum> {
    return this.pageDataService.getPageWithUrl(url);
  }
}
