import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { BusinessCreateInput } from './types/business-create.input';
@Injectable()
export class BusinessService {
  constructor(private prisma: PrismaService) {}

  async businesses() {
    return this.prisma.business.findMany();
  }

  async business(id: string) {
    return this.prisma.business.findUnique({
      where: { id },
    });
  }

  async createBusiness(data: BusinessCreateInput) {
    return this.prisma.business.create({
      data,
    });
  }
}
