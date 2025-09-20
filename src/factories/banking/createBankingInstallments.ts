
import { Factory, FactoryOptions, Helper } from "../../logic/factoryService";
import { BankAccountWrapper, BankingInstalmentPlanSchedule } from "../../schema/cdr-test-data-schema";
import { BankingInstalmentPlan } from 'consumer-data-standards/banking';
import { RandomBanking, TransactionStatus, TransactionType, generateRandomDecimalInRangeFormatted } from "../../random-generators";

import { randomUUID } from "crypto";
import { faker } from "@faker-js/faker";
import { generateBPAYBillerCode, generateMaskedPAN } from "./utils";

const factoryId: string = "create-banking-installments";

export class CreateBankingInstallments extends Factory {
    
    public static id: string = factoryId;


    private accountWrapper: BankAccountWrapper | undefined;

    public get briefDescription(): string {
       return  "Create a number of number of banking installments.";
    }
    public get detailedDescription(): string {
        let st = `
Create a number of number of banking installments.

This factory will accept the following options
        
    - count:             The number of installments to be issued for each account. Default is 1                       

Key values randomly allocated:
    - Dates, numeric values, and other enumerated types
            `;
        return st;
    }
  
    constructor(options: FactoryOptions) {
        super(options, factoryId);
      }

    public canCreateBankInstallments(): boolean { return true; };
    public generateBankInstallments(account: BankAccountWrapper): any[] | undefined {
        let count = Helper.isPositiveInteger(this.options.options?.count) ? (this.options.options?.count as number) : 1;

        let ret: BankingInstalmentPlan[] = [];
        for (let i = 0; i < count; i++) {
            const el = this.generateBankInstallment(account);
            if (el) ret.push(el);
        }
        return ret;

     }

    public canCreateBankInstallment(): boolean { return true; };
    public generateBankInstallment(account: BankAccountWrapper): any | undefined { 
        let detailIsAvailable: boolean = Helper.randomBoolean(0.5);

        let executionDateTime = Helper.randomDateTimeInThePast();
        let valueDateTime = Helper.generateRandomDateTimeInRange(executionDateTime, Date());
        let postingDateTime = Helper.generateRandomDateTimeInRange(valueDateTime, Date());
        let count = Helper.generateRandomIntegerInRange(1, 5);
        let sched: BankingInstalmentPlanSchedule[] = this.generateInstallmentPlanSchedule(count)
        let installment: BankingInstalmentPlan = {
            accountId: account.account.accountId,
            planId: randomUUID(),
            planReference: faker.random.alpha({count: 6, casing: 'upper'}),
            merchantName: faker.company.name(),
            planNickname: faker.random.alpha({count: 4, casing: 'upper'}),
            creationDate: Helper.randomDateTimeInThePast(),
            amount: Helper.generateRandomDecimalInRange(10, 10000, 2),
            duration: "P6W",
            instalmentInterval: "P2W",
            schedule: sched
        };
        if (Math.random() > 0.5) installment.merchantCategoryCode = faker.random.alpha({count: 3, casing: 'upper'});
        if (Math.random() > 0.5) installment.planCharge = Helper.generateRandomDecimalInRange(10, 20, 2);
        if (Math.random() > 0.5) installment.planRate = Helper.generateRandomDecimalInRange(0.001, 0.1, 2);
        if (Math.random() > 0.5) installment.planCurrency = "AUD";
        return installment;
    }

    private generateInstallmentPlanSchedule(count: number) : BankingInstalmentPlanSchedule[] {
        let retArray: BankingInstalmentPlanSchedule[] = [];
        for(let i = 0; i < count; i++) {
            let schedule: BankingInstalmentPlanSchedule = {
                amountDue: Helper.generateRandomDecimalInRange(10, 10000, 2),
                dueDate: Helper.randomDateTimeInTheFuture()
            }
            if (Math.random() > 0.5) schedule.isPaid = Helper.randomBoolean(0.3);
            retArray.push(schedule)
        }
        return retArray;
    }
}