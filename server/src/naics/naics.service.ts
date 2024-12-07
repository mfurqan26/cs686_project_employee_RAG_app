import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class NAICSService {
  constructor(private prisma: PrismaService) {}

  // Finds a NAICS by code
  async naic(code: number) {
    return this.prisma.nAICS.findUnique({
      where: { code },
    });
  }

  async naicsExists(code: number): Promise<boolean> {
    const naics = await this.prisma.nAICS.findUnique({
      where: { code },
      select: { code: true },
    });
    return !!naics;
  }

  async naicsList() {
    return this.prisma.nAICS.findMany();
  }
}
