import { Module, CacheModule } from '@nestjs/common';
import { PageDataService } from './page-data.service';
import { PageDataResolver } from './page-data.resolver';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      url: 'redis://:pcc716d34d0aaedb67c1d0143e2cf510b6dfa892fb96b3c94894cc72695fc600b@ec2-52-70-127-38.compute-1.amazonaws.com:26999',
    }),
  ],
  providers: [PageDataResolver, PageDataService],
})
export class PageDataModule {}
