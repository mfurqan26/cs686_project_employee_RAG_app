"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const business_service_1 = require("./business.service");
const business_model_1 = require("./types/business.model");
let BusinessResolver = class BusinessResolver {
    constructor(businessService) {
        this.businessService = businessService;
    }
    async businesses() {
        return this.businessService.businesses();
    }
    async business(id) {
        return this.businessService.business(id);
    }
    async createBusiness(name, industry) {
        return this.businessService.createBusiness({ name, industry });
    }
};
exports.BusinessResolver = BusinessResolver;
__decorate([
    (0, graphql_1.Query)(() => [business_model_1.Business]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BusinessResolver.prototype, "businesses", null);
__decorate([
    (0, graphql_1.Query)(() => business_model_1.Business, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BusinessResolver.prototype, "business", null);
__decorate([
    (0, graphql_1.Mutation)(() => business_model_1.Business),
    __param(0, (0, graphql_1.Args)('name')),
    __param(1, (0, graphql_1.Args)('industry')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BusinessResolver.prototype, "createBusiness", null);
exports.BusinessResolver = BusinessResolver = __decorate([
    (0, graphql_1.Resolver)(() => business_model_1.Business),
    __metadata("design:paramtypes", [business_service_1.BusinessService])
], BusinessResolver);
//# sourceMappingURL=business.resolver.js.map