import { BankAccountWrapper, HolderWrapper } from '../../logic/schema/cdr-test-data-schema';
import { ContraintType, DepositRateType, EligibilityType, FeatureType, FeeType, LendingRateType, ProductCategory, RandomBanking } from '../../random-generators/random-banking';
import { Factory, FactoryOptions, Helper } from '../../logic/factoryService'
import { BankingDirectDebit } from 'consumer-data-standards/banking';
import { faker } from "@faker-js/faker";

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
                
            type:  This should be BankingProductCategory as defined in https://consumerdatastandardsaustralia.github.io/standards/#tocSbankingpayeev2
                              If not specified it will be randomnly assigned.

          Key values randomly allocated:
            Dates, numeric values, and other enumerated types`;
    return st;
  }
  public canCreateBankDirectDebits(): boolean { return true; };
  public generateBankDirectDebits(accounts: BankAccountWrapper[]): BankingDirectDebit[] | undefined {
    let count = Helper.isPositiveInteger(this.options.options?.count) ? (this.options.options?.count as number) : 1;

    let ret: BankingDirectDebit[] = [];
    for (let i = 0; i < count; i++) {
      ret.push({
        accountId: accounts[0].account.accountId,
        authorisedEntity: {
          description: "Direct debit description",
          financialInstitution: "ACME Bank",
          abn: "012345678",
          acn: "012345678"
        },
        lastDebitDateTime: Helper.randomDateTimeInThePast(),
        lastDebitAmount: "10.00"
      })
    }
    return ret;
  }
}