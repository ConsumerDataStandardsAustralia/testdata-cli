import { BankAccountWrapper, HolderWrapper } from '../../logic/schema/cdr-test-data-schema';
import { ContraintType, DepositRateType, EligibilityType, FeatureType, FeeType, LendingRateType, ProductCategory, RandomBanking } from '../../random-generators/random-banking';
import { Factory, FactoryOptions, Helper } from '../../logic/factoryService'
import { BankingBalance } from 'consumer-data-standards/banking';

const factoryId: string = "create-banking-balances";


export class CreateBalances extends Factory {

  constructor(options: FactoryOptions) {
    super(options, factoryId);

  }

  public static id: string = factoryId;


  public get briefDescription(): string {
    return "Create a number of banking balances.";
  }
  public get detailedDescription(): string {
    let st = `
          Create a number of number of banking balances.

          This factory will accept the following options
                
            type:  This should be BankingProductCategory as defined in https://consumerdatastandardsaustralia.github.io/standards/#tocSbankingpayeev2
                              If not specified it will be randomnly assigned.

          Key values randomly allocated:
            Dates, numeric values, and other enumerated types`;
    return st;
  }

  public canCreateBankBalance(): boolean { return true; };
  public generateBankBalance(account: BankAccountWrapper): BankingBalance | undefined {
    return {
      accountId: account.account.accountId,
      currentBalance: "100.00",
      availableBalance: "100.00"
    }
  }

}