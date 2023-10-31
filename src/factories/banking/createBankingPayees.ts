import { BankAccountWrapper, HolderWrapper } from '../../logic/schema/cdr-test-data-schema';
import { ContraintType, DepositRateType, EligibilityType, FeatureType, FeeType, LendingRateType, ProductCategory, RandomBanking } from '../../random-generators/random-banking';
import { Factory, FactoryOptions, Helper } from '../../logic/factoryService'
import { BankingPayeeDetailV2 } from 'consumer-data-standards/banking';

const factoryId: string = "create-banking-payees";


export class CreatePayees extends Factory {

  constructor(options: FactoryOptions) {
    super(options, factoryId);

  }

  public static id: string = factoryId;


  public get briefDescription(): string {
    return "Create a number of banking payees.";
  }
  public get detailedDescription(): string {
    let st = `
          Create a number of number of banking payees.

          This factory will accept the following options
                
            type:  This should be BankingProductCategory as defined in https://consumerdatastandardsaustralia.github.io/standards/#tocSbankingpayeev2
                              If not specified it will be randomnly assigned.

          Key values randomly allocated:
            Dates, numeric values, and other enumerated types`;
    return st;
  }

  public canCreateBankPayees(): boolean { return true; };
  public generateBankPayees(accounts: BankAccountWrapper[]): BankingPayeeDetailV2[] | undefined {
    let count = Helper.isPositiveInteger(this.options.options?.count) ? (this.options.options?.count as number) : 1;

    let ret: BankingPayeeDetailV2[] = [];
    for (let i = 0; i < count; i++) {
      ret.push({
        payeeId: Helper.randomId(),
        nickname: "Nick name",
        description: "A standard biller",
        type: "DOMESTIC",
        creationDate: Helper.randomDateTimeInThePast(),
        payeeUType: "domestic",
        payeeAccountUType: "account",
        account: {
          accountName: "The account",
          bsb: "123456",
          accountNumber: "123456789"
        }
      });
    }
    return ret;
  }  
}