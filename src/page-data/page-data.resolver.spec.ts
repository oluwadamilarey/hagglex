import { Test, TestingModule } from '@nestjs/testing';
import { PageDataResolver } from './page-data.resolver';
import { PageDataService } from './page-data.service';

describe('PageDataResolver', () => {
  let resolver: PageDataResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageDataResolver, PageDataService],
    }).compile();

    resolver = module.get<PageDataResolver>(PageDataResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
