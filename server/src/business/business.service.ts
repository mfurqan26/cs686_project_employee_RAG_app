import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { BusinessCreateInput } from './types/business-create.input';
import { BusinessUpdateInput } from './types/business-update.input';

@Injectable()
export class BusinessService {
  constructor(private prisma: PrismaService) {}

  async businesses() {
    return this.prisma.business.findMany();
  }

  async business(id: string) {
    // Check if business exists
    const businessExists = await this.prisma.business.findUnique({
      where: { id },
    });
    if (!businessExists) {
      throw new Error('Business not found');
    }
    return businessExists;
  }

  async createBusiness(data: BusinessCreateInput) {
    return this.prisma.business.create({
      data,
    });
  }

  async updateBusiness(data: BusinessUpdateInput) {
    // Check if business exists
    const businessExists = await this.business(data.id);
    if (!businessExists) {
      throw new Error('Business not found');
    }
    return this.prisma.business.update({
      where: { id: data.id },
      data,
    });
  }

  async deleteBusiness(id: string) {
    // Check if business exists

    const businessExists = await this.business(id);
    if (!businessExists) {
      throw new Error('Business not found');
    }
    return this.prisma.business.delete({
      where: { id },
    });
  }
}
