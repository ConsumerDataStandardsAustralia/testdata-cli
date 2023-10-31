import { BankAccountWrapper, HolderWrapper } from '../../logic/schema/cdr-test-data-schema';
import { ContraintType, DepositRateType, EligibilityType, FeatureType, FeeType, LendingRateType, PayeeUType, ProductCategory, RandomBanking } from '../../random-generators/random-banking';
import { Factory, FactoryOptions, Helper } from '../../logic/factoryService'
import { BankingBillerPayee, BankingDigitalWalletPayee, BankingDomesticPayee, BankingInternationalPayee, BankingPayeeDetailV2 } from 'consumer-data-standards/banking';
import { PayeeType } from '../../random-generators/random-banking';
import { randomUUID } from 'crypto';
import { faker } from "@faker-js/faker";

const factoryId: string = "create-banking-payees";


export class CreatePayees extends Factory {

  private payeeType: PayeeType;


  constructor(options: FactoryOptions) {
    super(options, factoryId);
    this.payeeType = this.options.options?.type ? this.options.options?.type as PayeeType: RandomBanking.PayeeType();
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
        const el = this.generatePayee(accounts);
        if (el) ret.push(el);
    }
    return ret;

  }
  
  private generatePayee(accounts: BankAccountWrapper[]) : BankingPayeeDetailV2{

    let ret: BankingPayeeDetailV2 = {
      payeeUType: RandomBanking.PayeeUType(),
      nickname: '',
      payeeId: randomUUID(),
      type: this.payeeType
    };
    if (Math.random() > 0.5) ret.description = faker.company.name();
    if (Math.random() > 0.5) ret.creationDate = Helper.randomDateTimeInThePast();

    return ret;
  }


  private generateBillerPayee(): BankingBillerPayee {
    let ret : BankingBillerPayee = {};
    return ret;
  }

  private generateDomesticPayee(): BankingDomesticPayee {
    let ret : BankingDomesticPayee = {};
    return ret;
  }

  private generateDigitalWalletPayee(): BankingDigitalWalletPayee {
    let ret : BankingDigitalWalletPayee = {};
    return ret;
  }


  private generateInternationalPayee(): BankingInternationalPayee {
    let ret : BankingInternationalPayee = {};
    return ret;
  }

}