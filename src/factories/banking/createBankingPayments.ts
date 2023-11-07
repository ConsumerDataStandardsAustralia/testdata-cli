import { BankAccountWrapper } from '../../logic/schema/cdr-test-data-schema';
import {  DigitalWalletPayeeType,  PayeeAccountType, RandomBanking, RecurrenceUType, ScheduledPaymentStatusType, ScheduledPaymentToUType } from '../../random-generators/random-banking';
import { Factory, FactoryOptions, Helper } from '../../logic/factoryService'
import { faker } from "@faker-js/faker";
import { BankingBillerPayee, BankingDigitalWalletPayee, BankingDomesticPayee, BankingDomesticPayeeAccount, BankingDomesticPayeeCard, BankingDomesticPayeePayId, BankingInternationalPayee, BankingScheduledPaymentFrom, BankingScheduledPaymentInterval, BankingScheduledPaymentRecurrence, BankingScheduledPaymentRecurrenceEventBased, BankingScheduledPaymentRecurrenceIntervalSchedule, BankingScheduledPaymentRecurrenceLastWeekday, BankingScheduledPaymentRecurrenceOnceOff, BankingScheduledPaymentSetV2, BankingScheduledPaymentToV2, BankingScheduledPaymentV2 } from 'consumer-data-standards/banking';
import { randomUUID } from 'crypto';
import { generatISODuration, generateBPAYBillerCode, generateBSB, generateDigitalWalletNameFromType, generateMaskedPAN, generatePayIdNameFromType } from './utils';

const factoryId: string = "create-banking-payments";


export class CreateScheduledPayments extends Factory {

  private paymentStatus: ScheduledPaymentStatusType;
  private recurrence: RecurrenceUType;

  constructor(options: FactoryOptions) {
    super(options, factoryId);
    this.paymentStatus = this.options.options?.status ? this.options.options?.status as ScheduledPaymentStatusType : RandomBanking.ScheduledPaymentStatusType();
    this.recurrence = this.options.options?.recurrence ? this.options.options?.recurrence as RecurrenceUType : RandomBanking.RecurrenceUType();
  }

  public static id: string = factoryId;


  public get briefDescription(): string {
    return "Create a number of banking scheduled payments.";
  }
  public get detailedDescription(): string {
    let st = `
Create a number of number of banking scheduled payments.

This factory will accept the following options

    - count:      The number of payments to be created for each account. Default is 1    
    - status:     This should be either ACTIVE, INACTIVE, or SKIP
                  If not specified it will be randomnly assigned.
    - recurrence: The type of payment recurrence as defined here https://consumerdatastandardsaustralia.github.io/standards/#tocSbankingscheduledpaymentrecurrence
                  as recurrenceUType

Key values randomly allocated:
    - Dates, numeric values, and other enumerated types
            `;
    return st;
  }

  public canCreateBankScheduledPayments(): boolean { return true; };

  public generateScheduledPayments(accounts: BankAccountWrapper[]): any[] | undefined {
    let count = Helper.isPositiveInteger(this.options.options?.count) ? (this.options.options?.count as number) : 1;
    let ret: BankingScheduledPaymentV2[] = [];
    for (let i = 0; i < count; i++) {
      const el = this.generatePayment(accounts);
      if (el) ret.push(el);
    }
    return ret;
  }

  private generatePayment(accounts: BankAccountWrapper[]): BankingScheduledPaymentV2 {

    const dt = Helper.randomDateTimeInTheFuture();
    let account: BankAccountWrapper = faker.helpers.arrayElement(accounts);
    let randomAccountId = account?.account.accountId
    let from: BankingScheduledPaymentFrom = {
      accountId: randomAccountId
    };

    let ret: BankingScheduledPaymentV2 = {
      from: from,
      payerReference: `Ref: ${faker.random.words(3)}`,
      paymentSet: this.generatePaymentSet(accounts),
      recurrence: this.generatePaymentRecurrence(accounts),
      scheduledPaymentId: randomUUID(),
      status: this.paymentStatus
    };
 
    return ret;
  } 

  private generatePaymentSet(accounts: BankAccountWrapper[]): BankingScheduledPaymentSetV2[] {
      let ret: BankingScheduledPaymentSetV2[] = []
      let cnt = Helper.generateRandomIntegerInRange(1, 3);
      for (let i = 0; i < cnt; i++) {
        let paymentSet: BankingScheduledPaymentSetV2 = {
          to: this.generateScheduledTo(accounts)
        };
        ret.push(paymentSet);
      }
      return ret;
  }


  private generatePaymentRecurrence(accounts: BankAccountWrapper[]) : BankingScheduledPaymentRecurrence {
     let ret: BankingScheduledPaymentRecurrence = {
       recurrenceUType: this.recurrence
     }
     if (Math.random() > 0.25) ret.nextPaymentDate = Helper.randomDateTimeInTheFuture();
     switch(this.recurrence) {
      case (RecurrenceUType.eventBased): {
        ret.eventBased = this.generateEventBased();
        break;
      }
      case (RecurrenceUType.intervalSchedule): {
        ret.intervalSchedule = this.generateScheduled()
        break;
      }
      case (RecurrenceUType.lastWeekDay): {
        ret.lastWeekDay = this.generateLastWeekday();
        break;
      }
      case (RecurrenceUType.onceOff): {
        ret.onceOff = this.generateOnceOff();
        ret.nextPaymentDate = ret.onceOff.paymentDate;
        break;
      } 
      default: break;                   
     }
     return ret;
  }

  private generateOnceOff():  BankingScheduledPaymentRecurrenceOnceOff {
    let ret: BankingScheduledPaymentRecurrenceOnceOff = {
      paymentDate: Helper.randomDateTimeInTheFuture()
    }
    return ret;
  }

  private generateScheduled():  BankingScheduledPaymentRecurrenceIntervalSchedule {

    let cnt = Helper.generateRandomIntegerInRange(1, 3);
    let intervals : BankingScheduledPaymentInterval[] = [];
    for (let i = 0; i < cnt; i++) {
      let interval: BankingScheduledPaymentInterval = this.generatePaymentInterval();
      intervals.push(interval);
    }
    let ret: BankingScheduledPaymentRecurrenceIntervalSchedule = {
      intervals: intervals
    };
    if (Math.random() > 0.25) ret.nonBusinessDayTreatment = RandomBanking.NonBusinessDayTreatment();
    if (Math.random() > 0.25) ret.finalPaymentDate = Helper.randomDateTimeInTheFuture();
    if (Math.random() > 0.25) ret.paymentsRemaining = Helper.generateRandomIntegerInRange(1, 150);
    return ret;
  }

  private generateLastWeekday():  BankingScheduledPaymentRecurrenceLastWeekday {
    let ret: BankingScheduledPaymentRecurrenceLastWeekday = {
      interval: generatISODuration(),
      lastWeekDay: RandomBanking.LastWeekDay()
    }
    if (Math.random() > 0.25) ret.finalPaymentDate = Helper.randomDateTimeInTheFuture();
    if (Math.random() > 0.25) ret.paymentsRemaining = Helper.generateRandomIntegerInRange(1, 150);
    if (Math.random() > 0.25) ret.nonBusinessDayTreatment = RandomBanking.NonBusinessDayTreatment();
    return ret;
  }

  private generateEventBased():  BankingScheduledPaymentRecurrenceEventBased {
    let ret: BankingScheduledPaymentRecurrenceEventBased = {
      description: `Trigged by a missing ${faker.random.words()}`
    }
    return ret;
  }

  private generatePaymentInterval(): BankingScheduledPaymentInterval {
    let ret: BankingScheduledPaymentInterval = {
      interval: generatISODuration()
    }
    if (Math.random() > 0.25) ret.dayInInterval = generatISODuration();
    return ret;    
  }

  private generateBillPayee(): BankingBillerPayee {
    let ret: BankingBillerPayee = {
      billerCode: generateBPAYBillerCode(),
      billerName: faker.finance.accountName()
    }
    if (Math.random() > 0.25) ret.crn = 'hhjasdjhkjkasd'
    return ret;    
  }

  private generateBankingInternationalPayee(): BankingInternationalPayee {
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
    }
    return ret;    
  }

  private generateDomesticPayee(): BankingDomesticPayee {
    let payeeAccountUType = RandomBanking.PayeeAccountType()
    let ret: BankingDomesticPayee = {
      payeeAccountUType: payeeAccountUType
    }
    switch (payeeAccountUType) {
       case (PayeeAccountType.account): {
          let acc: BankingDomesticPayeeAccount = {
            accountNumber: `${Helper.generateRandomIntegerInRange(100000000, 999999999)}`,
            bsb: generateBSB()
          }
          if (Math.random() > 0.25) acc.accountName = faker.finance.accountName();
          ret.account = acc;
          break;
       }
       case (PayeeAccountType.card): {
        let card: BankingDomesticPayeeCard = {
          cardNumber: generateMaskedPAN()
        }
        ret.card = card;
        break;
      }
      case (PayeeAccountType.payId): {
        let payIdType = RandomBanking.PayIDType();
        let payId: BankingDomesticPayeePayId = {
          identifier: generatePayIdNameFromType(payIdType),
          type: payIdType
        }
        if (Math.random() > 0.25) payId.name = `PayId: ${faker.random.words(1)}`;
        ret.payId = payId;
        break;
      } 
      default: break;                
    }
    return ret;    
  }

  private generateDigitalWalletPayee(): BankingDigitalWalletPayee {
    let walletType: DigitalWalletPayeeType = RandomBanking.DigitalWalletPayeeType();
    let ret: BankingDigitalWalletPayee = {
      identifier: generateDigitalWalletNameFromType(walletType),
      name: `DigitalWallet: ${faker.random.words(1)}`,
      provider: RandomBanking.SelectDigitalWalletProvider(),
      type: walletType
    }
    return ret;    
  }

  private generateScheduledTo(accounts: BankAccountWrapper[]): BankingScheduledPaymentToV2 {
    let toUType: ScheduledPaymentToUType = RandomBanking.ScheduledPaymentToUType();
    // TODO let ret: any = {BankingScheduledPaymentToV2  /* Bug in DT lib required as digitalWallet currently is mandatory */
    let ret: any = {
      toUType: toUType
    }
    switch(toUType) {
      case ScheduledPaymentToUType.accountId:  {
        ret.accountId = randomUUID();
        ret.nickname = faker.random.words();
        break;
      }
      case ScheduledPaymentToUType.payeeId:  {
        ret.payeeId = randomUUID();
        ret.payeeReference = `Ref: ${Helper.generateRandomIntegerInRange(100000, 9999999)}`
        break;
      }
      case ScheduledPaymentToUType.biller:  {
          ret.biller = this.generateBillPayee();
          ret.nickname = faker.random.words();
          break;
      } 
      case ScheduledPaymentToUType.international:  {
        ret.international = this.generateBankingInternationalPayee();
        ret.nickname = faker.random.words();
        break;
      } 
      case ScheduledPaymentToUType.domestic:  {
        ret.domestic = this.generateDomesticPayee();
        ret.nickname = faker.random.words();
        break;
      } 
      case ScheduledPaymentToUType.digitalWallet:  {
        ret.digitalWallet = this.generateDigitalWalletPayee();
        ret.nickname = faker.random.words();
        break;
      }  
      default: break;                           
    }

    return ret;   
  }

}