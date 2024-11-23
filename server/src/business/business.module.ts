import { Module } from '@nestjs/common';
import { BusinessResolver } from './business.resolver';
import { BusinessService } from './business.service';

@Module({
  providers: [BusinessResolver, BusinessService],
  exports: [BusinessService],
})
export class BusinessModule {}
