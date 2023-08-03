import { EnergyPlan, EnergyPlanContractFullV2, EnergyPlanDetailV2} from "consumer-data-standards/energy";
import { CustomerType, FuelType, PlanTermType, PlanType, PricingModel, RandomEnergy } from "../../random-generators";
import { Factory, FactoryOptions, Helper } from "../../logic/factoryService";
import { randomUUID } from "crypto";
import { faker } from "@faker-js/faker";
import { generateContract } from "./utils";
import { Customer } from "../../logic/schema/cdr-test-data-schema";

const factoryId: string = "create-energy-plan-data";

export class CreateEnergyPlanData extends Factory {

    constructor(options: FactoryOptions) {
        super(options, factoryId);
        this.customerType = options?.options?.customerType ? options?.options?.customerType as CustomerType: RandomEnergy.CustomerType();
        this.planType = options?.options?.planType ? options?.options?.planType as PlanType: RandomEnergy.PlanType();
        this.fuelType = options?.options?.fuelType ? options?.options?.fuelType as FuelType: FuelType.DUAL;
    }

    private fuelType: FuelType;
    private customerType: CustomerType;
    private planType: PlanType;
    public static id: string = factoryId;

    public get briefDescription(): string {
        return "Create a number of number of energy plans.";
    }
    public get detailedDescription(): string {
        let st = `
Create a number of number of energy plans.

This factory will accept the following options
        
    fuelType:         This should be ELECTRICITY,GAS or DUAL (Default: DUAL)
    planType:         The type of plan: STANDING, MARKET, or REGULATED (Default randomly assigned)
    customerType:     RESIDENTIAL or BUSINESS (Default randomly assigned)

Key values randomly allocated:
    Dates, numeric values, and other enumerated types`;
        return st;
    } 

    public canCreateEnergyPlans(): boolean {return true}


    public generateEnergyPlans(): EnergyPlanDetailV2[] | undefined  {
        let count = Helper.isPositiveInteger(this.options.options?.count) ? (this.options.options?.count as number) : 1;

        let ret: EnergyPlanDetailV2[] = [];
        for (let i = 0; i < count; i++) {
            const plan: EnergyPlanDetailV2 = {
                brand:  RandomEnergy.Brand(),
                brandName: RandomEnergy.Brand(),
                fuelType: this.fuelType,
                lastUpdated: Helper.randomTimeInThePast(),
                planId: randomUUID(),
                type: this.planType
            };
            plan.effectiveFrom = Helper.randomDateTimeInTheFuture();
            plan.effectiveTo= Helper.randomDateTimeAfterDateString(plan.effectiveFrom);
            plan.displayName = `Energy Plan ${i}`;
            plan.description = "Energy plan optional description";
            plan.applicationUri = faker.internet.url();
            plan.customerType = this.customerType;
            let additionalInfo : any = {};
            if (Math.random() > 0.5) additionalInfo.overviewUri = faker.internet.url();
            if (Math.random() > 0.5) additionalInfo.termsUri = faker.internet.url();
            if (Math.random() > 0.5) additionalInfo.eligibilityUri = faker.internet.url();
            if (Math.random() > 0.5) additionalInfo.pricingUri = faker.internet.url();
            if (Math.random() > 0.5) additionalInfo.bundleUri = faker.internet.url();
            if (Math.random() > 0.5) plan.additionalInformation = additionalInfo;

            let geography: any = {};
            if (Math.random() > 0.25) geography.excludedPostcodes = ["6023", "2000"];
            if (Math.random() > 0.25) geography.includedPostcodes = ["3000-3999"];
            geography.distributors = [faker.company.name(), faker.company.name()];
            if (Math.random() > 0.25) plan.geography = geography;
            let includeCharges = Helper.randomBoolean(0.95);
            if (includeCharges) {
                let meteringCharges: any = [];
                let charge: any = {};
                charge.displayName = 'Metering Display Name';
                charge.description = 'Optional description for metering charges';
                charge.minimumValue = Math.ceil(Math.random() * 100).toString();
                charge.maximumValue = '999999';
                charge.period = 'P3Y6M4DT12H30M5S';        
                meteringCharges.push(charge);
                plan.meteringCharges = meteringCharges;
            }
            if (this.fuelType == FuelType.GAS || this.fuelType == FuelType.DUAL) plan.gasContract = this.generateGasContract();
            if (this.fuelType == FuelType.ELECTRICITY || this.fuelType == FuelType.DUAL) plan.electricityContract = this.generateElectricitContract();
            ret.push(plan);
        }
        return ret;      
    }

    public generateGasContract(): any {
        let gasContract = generateContract(PricingModel.SINGLE_RATE);
        gasContract.termType = RandomEnergy.PlanTermType();
        if (this.planType == PlanType.MARKET) gasContract.coolingOffDays = Helper.generateRandomIntegerInRange(7,35);
        if (gasContract.termType == PlanTermType.ONGOING) gasContract.benefitPeriod = "Description for the benefit period";
        if (Math.random() > 0.25) gasContract.terms = "Free text description of the terms for the contract";
        if (Math.random() > 0.25) gasContract.billFrequency = ["P1M1"]
        return gasContract;
    }

    public generateElectricitContract(): any {
        let pricingModel = RandomEnergy.PricingModel();
        let electricityContract = generateContract(pricingModel);
        electricityContract.termType = RandomEnergy.PlanTermType();
        if (this.planType == PlanType.MARKET) electricityContract.coolingOffDays = Helper.generateRandomIntegerInRange(7,35);
        if (electricityContract.termType == PlanTermType.ONGOING) electricityContract.benefitPeriod = "Description for the benefit period";
        if (Math.random() > 0.25) electricityContract.terms = "Free text description of the terms for the contract";
        if (Math.random() > 0.25) electricityContract.billFrequency = ["P1M1"]
        return electricityContract;
    }
}