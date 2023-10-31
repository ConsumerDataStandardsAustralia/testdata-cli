import { BankAccountWrapper, HolderWrapper } from '../../logic/schema/cdr-test-data-schema';
import { ContraintType, DepositRateType, EligibilityType, FeatureType, FeeType, LendingRateType, PayeeAccountType, PayeeUType, ProductCategory, RandomBanking } from '../../random-generators/random-banking';
import { Factory, FactoryOptions, Helper } from '../../logic/factoryService'
import { BankingBillerPayee, BankingDigitalWalletPayee, BankingDomesticPayee, BankingDomesticPayeeAccount, BankingDomesticPayeeCard, BankingDomesticPayeePayId, BankingInternationalPayee, BankingPayeeDetailV2 } from 'consumer-data-standards/banking';
import { PayeeType } from '../../random-generators/random-banking';
import { randomUUID } from 'crypto';
import { faker } from "@faker-js/faker";
import { generateBPAYBillerCode, generateBSB, generateMaskedPAN, generatePayIdNameFromType } from './utils';

const factoryId: string = "create-banking-payees";


export class CreatePayees extends Factory {

  private payeeType: PayeeType;


  constructor(options: FactoryOptions) {
    super(options, factoryId);
    this.payeeType = this.options.options?.type ? this.options.options?.type as PayeeType : RandomBanking.PayeeType();
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

  private generatePayee(accounts: BankAccountWrapper[]): BankingPayeeDetailV2 {

    let ret: BankingPayeeDetailV2 = {
      payeeUType: RandomBanking.PayeeUType(),
      nickname: '',
      payeeId: randomUUID(),
      type: this.payeeType
    };
    if (Math.random() > 0.5) ret.description = faker.company.name();
    if (Math.random() > 0.5) ret.creationDate = Helper.randomDateTimeInThePast();

    switch (ret.payeeUType) {
      case PayeeUType.biller: ret.biller = this.generateBillerPayee();
        break;
      case PayeeUType.international: ret.international = this.generateInternationalPayee();
        break;
      case PayeeUType.digitalWallet: ret.digitalWallet = this.generateDigitalWalletPayee();
        break;
      case PayeeUType.domestic: ret.domestic = this.generateDomesticPayee();
        break;   
      default: break;     
    }
    return ret;
  }


  private generateBillerPayee(): BankingBillerPayee {
    let ret: BankingBillerPayee = {
      billerCode: generateBPAYBillerCode(),
      billerName: faker.company.name()
    };
    if (Math.random() > 0.25) ret.crn = generateMaskedPAN();
    return ret;
  }

  private generateDomesticPayee(): BankingDomesticPayee {
    let payeeAccountType = RandomBanking.PayeeAccountType();
    let ret: BankingDomesticPayee = {
      payeeAccountUType: payeeAccountType
    };
    switch (ret.payeeAccountUType) {
      case PayeeAccountType.account: {
        let payeeAccount: BankingDomesticPayeeAccount = {
          accountNumber: `${Helper.generateRandomIntegerInRange(10000000, 99999999)}`,
          bsb: generateBSB()
        }
        if (Math.random() > 0.25) payeeAccount.accountName = faker.company.name()
        ret.account = payeeAccount;
        break;
      }
      case PayeeAccountType.card: {
        let payeeCard: BankingDomesticPayeeCard = {
          cardNumber: generateMaskedPAN()
        }
        ret.card = payeeCard;
        break;
      }
      case PayeeAccountType.payId:     {
        let payIdType = RandomBanking.PayIDType();
        let identifier = generatePayIdNameFromType(payIdType);
        let payId: BankingDomesticPayeePayId = {
          identifier: identifier,
          type: payIdType
        }
        if (Math.random() > 0.25) payId.name = faker.company.name()
        ret.payId = payId;
        break;
      }
      default: break;     
    }
    return ret;
  }

  private generateDigitalWalletPayee(): BankingDigitalWalletPayee {
    let ret: BankingDigitalWalletPayee = {
      identifier: '',
      name: '',
      provider: 'OTHER',
      type: 'EMAIL'
    };
    return ret;
  }


  private generateInternationalPayee(): BankingInternationalPayee {
    let ret: BankingInternationalPayee = {
      bankDetails: {
        accountNumber: '',
        bankAddress: undefined,
        beneficiaryBankBIC: undefined,
        chipNumber: undefined,
        country: '',
        fedWireNumber: undefined,
        legalEntityIdentifier: undefined,
        routingNumber: undefined,
        sortCode: undefined
      },
      beneficiaryDetails: {
        country: '',
        message: undefined,
        name: undefined
      }
    };
    return ret;
  }

}