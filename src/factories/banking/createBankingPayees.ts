import { BankAccountWrapper} from '../../logic/schema/cdr-test-data-schema';
import {  PayeeAccountType, PayeeUType,  RandomBanking } from '../../random-generators/random-banking';
import { Factory, FactoryOptions, Helper } from '../../logic/factoryService'
import { BankingBillerPayee, BankingDigitalWalletPayee, BankingDomesticPayee, BankingDomesticPayeeAccount, BankingDomesticPayeeCard, BankingDomesticPayeePayId, BankingInternationalPayee, BankingPayeeDetailV2 } from 'consumer-data-standards/banking';
import { PayeeType } from '../../random-generators/random-banking';
import { randomUUID } from 'crypto';
import { faker } from "@faker-js/faker";
import { generateBIC, generateBPAYBillerCode, generateBSB, generateBankRoutingNumber, generateBankSortCode, generateDigitalWalletNameFromType, generateFedWireNumber, generateLegalEntityId, generateMaskedPAN, generatePayIdNameFromType } from './utils';

const factoryId: string = "create-banking-payees";


export class CreatePayees extends Factory {

  private payeeType: PayeeType;
  private payeeUType: PayeeUType;

  constructor(options: FactoryOptions) {
    super(options, factoryId);
    // Confirmed this with MV. The BankingPayeeV2.type is always equal to BankingPayeeDetailV2.payeeUType
    this.payeeType = this.options.options?.type ? this.options.options?.type as PayeeType : RandomBanking.PayeeType();
    this.payeeUType = PayeeUType[this.payeeType];
  }

  public static id: string = factoryId;


  public get briefDescription(): string {
    return "Create a number of banking payees.";
  }
  public get detailedDescription(): string {
    let st = `      
Create a number of number of banking payees.

This factory will accept the following options

    - count: The number of payees to be created for each account. Default is 1     
    - type:  This should be type as defined under BankingPayeeV2 (eg BILLER or DOMESTIC)
              If none specified it will be randomly assigned.

Key values randomly allocated:
    - Dates, numeric values, and other enumerated types
             `;
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
      payeeUType: this.payeeUType,
      nickname: faker.name.firstName(),
      payeeId: randomUUID(),
      type: this.payeeType
    };
    if (Math.random() > 0.5) ret.description = faker.company.name();
    if (Math.random() > 0.5) ret.creationDate = Helper.randomDateTimeInThePast();

    switch (ret.payeeUType) {
      case PayeeUType.BILLER: ret.biller = this.generateBillerPayee();
        break;
      case PayeeUType.INTERNATIONAL: ret.international = this.generateInternationalPayee();
        break;
      case PayeeUType.DIGITAL_WALLET: ret.digitalWallet = this.generateDigitalWalletPayee();
        break;
      case PayeeUType.DOMESTIC: ret.domestic = this.generateDomesticPayee();
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
    let payIdType = RandomBanking.DigitalWalletPayeeType();
    let identifier = generateDigitalWalletNameFromType(payIdType);
    let ret: BankingDigitalWalletPayee = {
      identifier: identifier,
      name: 'My Digital Wallet',
      provider: RandomBanking.SelectDigitalWalletProvider(),
      type: payIdType
    };
    return ret;
  }


  private generateInternationalPayee(): BankingInternationalPayee {
    let bankAddress: any = {};
    let addressObj = faker.address;
    bankAddress.name = faker.company.name();
    bankAddress.address = addressObj.streetAddress(true);
    let ret: BankingInternationalPayee = {
      bankDetails: {
        accountNumber: faker.finance.account(),
        bankAddress: bankAddress,
        country: addressObj.countryCode('alpha-3'),
      },
      beneficiaryDetails:  {
        country: addressObj.countryCode('alpha-3')
      }

    };
    if (Math.random() > 0.25) ret.bankDetails.bankAddress = bankAddress;

    if (Math.random() > 0.5) ret.beneficiaryDetails.name = faker.name.fullName();
    if (Math.random() > 0.5) ret.beneficiaryDetails.message = 'This is a lottery win from some strange country';

    if (Math.random() > 0.25) ret.bankDetails.fedWireNumber =  generateFedWireNumber();
    if (Math.random() > 0.25) ret.bankDetails.legalEntityIdentifier = generateLegalEntityId();
    if (Math.random() > 0.25) ret.bankDetails.routingNumber = generateBankRoutingNumber();
    if (Math.random() > 0.25) ret.bankDetails.sortCode = generateBankSortCode();
    if (Math.random() > 0.25) ret.bankDetails.beneficiaryBankBIC = generateBIC();
    if (Math.random() > 0.25) ret.bankDetails.chipNumber = undefined;
    return ret;
  }

}