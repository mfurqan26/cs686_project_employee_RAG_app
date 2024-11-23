import { BusinessService } from './business.service';
import { Business } from './types/business.model';
export declare class BusinessResolver {
    private readonly businessService;
    constructor(businessService: BusinessService);
    businesses(): Promise<Business[]>;
    business(id: string): Promise<Business>;
    createBusiness(name: string, industry: string): Promise<Business>;
}
