import { BankAccountWrapper, HolderWrapper } from '../../logic/schema/cdr-test-data-schema';
import { ContraintType, DepositRateType, EligibilityType, FeatureType, FeeType, LendingRateType, ProductCategory, RandomBanking } from '../../random-generators/random-banking';
import { Factory, FactoryOptions, Helper } from '../../logic/factoryService'
import { BankingScheduledPaymentFrom, BankingScheduledPaymentInterval, BankingScheduledPaymentRecurrence, BankingScheduledPaymentRecurrenceEventBased, BankingScheduledPaymentRecurrenceIntervalSchedule, BankingScheduledPaymentRecurrenceLastWeekday, BankingScheduledPaymentRecurrenceOnceOff, BankingScheduledPaymentSetV2, BankingScheduledPaymentToV2, BankingScheduledPaymentV2 } from 'consumer-data-standards/banking';

const factoryId: string = "create-banking-payments";


export class CreateScheduledPayments extends Factory {

  constructor(options: FactoryOptions) {
    super(options, factoryId);

  }

  public static id: string = factoryId;


  public get briefDescription(): string {
    return "Create a number of banking scheduled payments.";
  }
  public get detailedDescription(): string {
    let st = `
          Create a number of number of banking scheduled payments.

          This factory will accept the following options
                
            status:  This should be BankingProductCategory as defined in https://consumerdatastandardsaustralia.github.io/standards/#tocSbankingscheduledpaymentv2
                              If not specified it will be randomnly assigned.

          Key values randomly allocated:
            Dates, numeric values, and other enumerated types`;
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
    let from: BankingScheduledPaymentFrom = {
      accountId: ''
    };

    let ret: BankingScheduledPaymentV2 = {
      from: from,
      payerReference: '',
      paymentSet: this.generatePaymentSet(accounts),
      recurrence: this.generatePaymentRecurrence(accounts),
      scheduledPaymentId: '',
      status: 'ACTIVE'
    };
 
    return ret;
  } 


  private generatePaymentSet(accounts: BankAccountWrapper[]): BankingScheduledPaymentSetV2[] {
      let ret: BankingScheduledPaymentSetV2[] = []
      let cnt = Helper.generateRandomIntegerInRange(1, 3);
      for (let i = 0; i < cnt; i++) {
        let paymentSet: BankingScheduledPaymentSetV2 = {
          to: this.generateScheduledTo()
        };
        ret.push(paymentSet);
      }
      return ret;
  }


  private generatePaymentRecurrence(accounts: BankAccountWrapper[]) : BankingScheduledPaymentRecurrence {
     let recurrenceUType = RandomBanking.RecurrenceUType()
     let ret: BankingScheduledPaymentRecurrence = {
       recurrenceUType: recurrenceUType
     }
     return ret;
  }

  private generateOnceOff():  BankingScheduledPaymentRecurrenceOnceOff {
    let ret: BankingScheduledPaymentRecurrenceOnceOff = {
      paymentDate: ''
    }
    return ret;
  }

  private generateScheduled():  BankingScheduledPaymentRecurrenceIntervalSchedule {
    let ret: BankingScheduledPaymentRecurrenceIntervalSchedule = {
      intervals: []
    }
    return ret;
  }

  private generateLastWeekday():  BankingScheduledPaymentRecurrenceLastWeekday {
    let ret: BankingScheduledPaymentRecurrenceLastWeekday = {
      interval: '',
      lastWeekDay: 'FRI'
    }
    return ret;
  }

  private generateEventBased():  BankingScheduledPaymentRecurrenceEventBased {
    let ret: BankingScheduledPaymentRecurrenceEventBased = {
      description: ''
    }
    return ret;
  }

  private generatePaymentInterval(): BankingScheduledPaymentInterval {
    let ret: BankingScheduledPaymentInterval = {
      interval: ''
    }
    return ret;    
  }

  private generateScheduledTo(): BankingScheduledPaymentToV2 {
    let ret: BankingScheduledPaymentToV2 = {
      digitalWallet: {
        identifier: '',
        name: '',
        provider: 'PAYPAL_AU',
        type: 'EMAIL'
      },
      toUType: 'accountId'
    }
    return ret;   
  }

}