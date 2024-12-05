import { Module } from '@nestjs/common';
import { NAICSService } from './naics.service';
import { NAICSResolver } from './naics.resolver';

@Module({
  providers: [NAICSResolver, NAICSService],
  exports: [NAICSService],
})
export class NAICSModule {}
