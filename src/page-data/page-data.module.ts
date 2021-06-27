import { Module, CacheModule } from '@nestjs/common';
import { PageDataService } from './page-data.service';
import { PageDataResolver } from './page-data.resolver';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'redis',
      port: 6379,
    }),
  ],
  providers: [PageDataResolver, PageDataService],
})
export class PageDataModule {}
