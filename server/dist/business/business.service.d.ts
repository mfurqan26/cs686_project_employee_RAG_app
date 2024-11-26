import { PrismaService } from 'nestjs-prisma';
import { BusinessCreateInput } from './types/business-create.input';
export declare class BusinessService {
    private prisma;
    constructor(prisma: PrismaService);
    businesses(): Promise<{
        id: string;
        name: string;
        NAICSId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    business(id: string): Promise<{
        id: string;
        name: string;
        NAICSId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createBusiness(data: BusinessCreateInput): Promise<{
        id: string;
        name: string;
        NAICSId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
