import { BankAccountWrapper, HolderWrapper } from '../../logic/schema/cdr-test-data-schema';
import { ContraintType, DepositRateType, EligibilityType, FeatureType, FeeType, LendingRateType, ProductCategory, RandomBanking } from '../../random-generators/random-banking';
import { Factory, FactoryOptions, Helper } from '../../logic/factoryService'
import { BankingAuthorisedEntity, BankingDirectDebit, BankingProductCategory } from 'consumer-data-standards/banking';
import { faker } from "@faker-js/faker";
import { generateABN, generateACN } from './utils';

const factoryId: string = "create-banking-direct-debits";


export class CreateDirectDebits extends Factory {

  constructor(options: FactoryOptions) {
    super(options, factoryId);

  }

  public static id: string = factoryId;


  public get briefDescription(): string {
    return "Create a number of banking direct debits.";
  }
  public get detailedDescription(): string {
    let st = `
Create a number of number of banking direct debits.

This factory will accept the following options

    - count: The number of direct debits to be created for each account. Default is 1    
    
Key values randomly allocated:
  - Dates, numeric values, and other enumerated types
  `;
    return st;
  }
  public canCreateBankDirectDebits(): boolean { return true; };

    public generateBankDirectDebits(accounts: BankAccountWrapper[]): BankingDirectDebit[] | undefined {
      let count = Helper.isPositiveInteger(this.options.options?.count) ? (this.options.options?.count as number) : 1;
  
      let ret: BankingDirectDebit[] = [];
      for (let i = 0; i < count; i++) {
        const el = this.generatePayee(accounts);
        if (el) ret.push(el);
      }
      return ret;
  
    }
  
    private generatePayee(accounts: BankAccountWrapper[]): BankingDirectDebit {
        let account: BankAccountWrapper = faker.helpers.arrayElement(accounts);
        let entity: BankingAuthorisedEntity = this.createAuthorisedEntity(account?.account.productCategory as BankingProductCategory);
        
        let randomAccountId = account?.account.accountId
        let ret: BankingDirectDebit = {
          accountId: randomAccountId,
          authorisedEntity: entity
        }
        if (Math.random() > 0.25) ret.lastDebitDateTime = Helper.randomDateTimeInThePast();
        if (Math.random() > 0.25) ret.lastDebitAmount = Helper.generateRandomDecimalInRange(-10000, -10, 2);
        return ret;
    }


  private createAuthorisedEntity(category: BankingProductCategory): BankingAuthorisedEntity {
    // select a random bank as an institution
     let institution = RandomBanking.SelectBaseBrandInfo();
     // financial institution is required is NOT credit card
     let entity: BankingAuthorisedEntity = { }
     if (category != ProductCategory.CRED_AND_CHRG_CARDS) entity.financialInstitution = institution?.brandName;
     if (Math.random() > 0.5) entity.abn = generateABN();
     if (Math.random() > 0.5) entity.acn = generateACN();
     return entity;
  }

}