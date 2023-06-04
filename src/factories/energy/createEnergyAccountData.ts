import { EnergyAccountDetailV2, EnergyPlanContract,  EnergyPlanControlledLoad, EnergyPlanDiscounts, EnergyPlanEligibility, EnergyPlanFees, EnergyPlanGreenPowerCharges, EnergyPlanIncentives, EnergyPlanSolarFeedInTariff, EnergyPlanTariffPeriod } from 'consumer-data-standards/energy';
import { CustomerWrapper, EnergyAccountWrapper } from '../../logic/schema/cdr-test-data-schema';
import { Days,  EnergyDiscountType, EnergyOpenStatus, FeeTerm, FuelType, generateRandomDecimalInRangeFormatted, generateRandomNumericInRangeFormatted, MethodUType, OpenStatus,PowerChargeType,PricingModel, RandomEnergy, RateBlockUTypeControlledLoad, RateBlockUTypeForTariff, SolarFeedDays, SolarTariffUType } from '../../random-generators';
import { Factory, FactoryOptions, Helper } from '../../logic/factoryService'
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { generateContract, generatePlanDetails, generatePlanOverview } from './utils';

const factoryId: string = "create-energy-account-data";

export class CreateEnergyAccountData extends Factory {

    constructor(options: FactoryOptions) {
        super(options, factoryId);
        this.fuelType = options?.options?.fuelType ? options?.options?.fuelType as FuelType: FuelType.DUAL;
        this.accountStatus = options?.options?.status ? options?.options?.status as EnergyOpenStatus : null;
    }

    private fuelType: FuelType;
    private accountStatus: EnergyOpenStatus | null;

    public static id: string = factoryId;

    public get briefDescription(): string {
        return "Create a number of energy accounts for each customer of data holders";
    }
    public get detailedDescription(): string {
        let st = `
Create a number of energy accounts for each customer of a data holders.

This factory will accept the following options
        
    fuelType:   This should be ELECTRICITY,GAS or DUAL
    status:     OPEN or CLOSED (Default randomly assigned)
                If no value is provided it will default to DUAL

Key values randomly allocated:
    The number of plans for each account:  between 1 and 3`;
        return st;
    }

    public canCreateEnergyAccount(): boolean { return true; };
    public canCreateEnergyAccounts(): boolean { return true; };

    public generateEnergyAccount(customer: CustomerWrapper): EnergyAccountWrapper | undefined {

        let energyAccount: EnergyAccountDetailV2 = {
            creationDate: Helper.randomDateTimeInThePast(),
            plans: [],
            accountId: uuidv4()
        };
        let displayName = Helper.randomBoolean(null) ? "Display name" : null;
        // 80% probability that an account number exists
        let accountNumber = Helper.randomBoolean(0.8) ? "23455-4567" : null;
        // create a number of plan object, up to 10
        let planCount = Math.ceil(Math.random() * 3);
        let status = this.accountStatus;

        if (status) energyAccount.openStatus = status;
        if (displayName) energyAccount.displayName = displayName;
        if (accountNumber) energyAccount.accountNumber = accountNumber;
        if (energyAccount?.openStatus == EnergyOpenStatus.OPEN || Math.random() > 0.5) energyAccount.creationDate = Helper.randomDateTimeInThePast();
        for (let cnt = 0; cnt < planCount; cnt++) {
            let plan: any = {};
            let nickname = Helper.randomBoolean(null) ? "nickname" : null;
            if (nickname) plan.nickname = nickname;
            plan.servicePointIds = [];
            if (energyAccount?.openStatus == EnergyOpenStatus.OPEN) {
                // create a plan overview object
                let planOverview = generatePlanOverview();
                plan.planOverview = planOverview;
            }
            if (energyAccount?.openStatus == EnergyOpenStatus.OPEN || energyAccount?.openStatus == undefined || Math.random() > 0.5) {
                var planFuelType : FuelType = RandomEnergy.FuelType();
                if (this.fuelType != FuelType.DUAL) {
                    planFuelType = this.fuelType;
                }
                let planDetails = generatePlanDetails(planFuelType);
                if (planFuelType== FuelType.GAS) {
                    let gasContract = generateContract(PricingModel.SINGLE_RATE);
                    planDetails.gasContract = gasContract;
                }
                if (planFuelType == FuelType.ELECTRICITY) {
                    let electricityContract = generateContract(RandomEnergy.PricingModel());
                    planDetails.electricityContract = electricityContract;
                    plan.servicePointIds = this.getServicePointsForAccount();
                }
                if (planFuelType == FuelType.DUAL) {
                    let gasContract = generateContract(PricingModel.SINGLE_RATE);
                    planDetails.gasContract = gasContract;
                    let electricityContract = generateContract(RandomEnergy.PricingModel());
                    planDetails.electricityContract = electricityContract;
                    plan.servicePointIds = this.getServicePointsForAccount();
                }
                plan.planDetail = planDetails;
            }
            if (Math.random() > 0.5) {
                let contactCount: number = Math.ceil(Math.random() * 3);
                plan.authorisedContacts = this.generateAuthorisedContacts(contactCount);
            }
            energyAccount.plans.push(plan);
        }
        let result: EnergyAccountWrapper = {
            account: energyAccount
        };
        return result;
    }

    private getServicePointsForAccount(): string[]{
        let spIds: string[] = [];
        let servicePointCount = Math.ceil(Math.random() * 5);
        for (let cnt = 0; cnt < servicePointCount; cnt++) {
            spIds.push(RandomEnergy.GenerateNMI());
        }
        return spIds;
    }

    private generateAuthorisedContacts(cnt: number): any {
        let authorisedContacts: any[] = [];
        for(let i = 0; i < cnt; i++) {
            let contact: any = {
                lastName: faker.name.lastName()
            }
            authorisedContacts.push(contact)
        }
        return authorisedContacts;
    }

    public generateEnergyAccounts(customer: CustomerWrapper): EnergyAccountWrapper[] | undefined {
        let count = Helper.isPositiveInteger(this.options.options?.count) ? (this.options.options?.count as number) : 1;

        let ret: EnergyAccountWrapper[] = [];
        for (let i = 0; i < count; i++) {
            const el = this.generateEnergyAccount(customer);
            if (el) ret.push(el);
        }
        return ret;
    }
}


