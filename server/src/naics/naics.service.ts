import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class NAICSService {
  constructor(private prisma: PrismaService) {}

  async findByCode(code: number) {
    return this.prisma.nAICS.findUnique({
      where: { code },
    });
  }

  async exists(code: number): Promise<boolean> {
    const naics = await this.prisma.nAICS.findUnique({
      where: { code },
      select: { code: true },
    });
    return !!naics;
  }

  async findAll() {
    return this.prisma.nAICS.findMany();
  }
}
